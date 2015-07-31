/**
 * Created by JOSEVALDERLEI on 16/06/2015.
 */
(function(){

    "use strict";

    var User = require('../models/user');
    var config = require('../../config.server');
    var secretKey = config.secretKey;
    var router = require('express').Router();
    var Problem = require('../models/problem/problem');
    var jsonwebtoken = require('jsonwebtoken');

    function createToken(user){
        var token = jsonwebtoken.sign({
            id: user._id,
            fullname: user.fullname,
            nickname: user.nickname,
            email: user.email,
            language: user.language
        }, secretKey,{
            expirtesInMinute: 1440
        });
        return token;
    }

    module.exports = function () {

        router.route('/signup')
            .post(signuUser)
        router.route('/users')
            .get(getUsers);
        router.route('/login')
            .post(userValidate);
        router.use(validate);
        router.route('/me')
            .get(getUser);

        return router;

        function signuUser(req,res){
            User.findOne({
                email: req.body.email
            }).select('email').exec(function(err,user){
                if(err) throw err;
                if(!user){
                    var user = new User({
                        fullname: req.body.fullname,
                        nickname: req.body.nickname,
                        password: req.body.password,
                        email: req.body.email,
                        language: req.body.language
                    });
                    user.save(function (err) {
                        if(err){
                            console.log(err);
                            return;
                        }
                        res.json({
                            success: true,
                            mensage: "User has been created.",
                            token: createToken(user)
                        })
                    }).then(
                        Problem.find({"collaborators.email": user.email })
                            .where('status' ).equals('active')
                            .exec (function (err,problems) {
                            if(err){
                                res.send(err);
                                return;
                            }
                            if(problems.length > 0){
                                for(var i = 0; i < problems.length; i++) {
                                    var collaborator = selectCollaborator(problems[i].collaborators, user.email);
                                    collaborator.nickname = user.nickname;
                                    collaborator.accept = true;
                                    collaborator.fullname = user.fullname;
                                    Problem.findOneAndUpdate({ _id: problems[i]._id, "collaborators._id": collaborator._id },
                                        {"$set": {"collaborators.$": collaborator  }},function(err,update){
                                            if(err){
                                                console.log(err)
                                            }else{
                                                console.log(update);
                                            }
                                        });
                                }
                            }else{

                                console.log("---------------------------------Sem problemas")
                            }
                        })
                    );
                }else if (user){
                    res.json({
                        success: false,
                        mensage: "User not has been created!"
                    });

                }
            });

        }

        function selectCollaborator(list, email){
            var collaborator;
            for (var i = 0; i < list.length; i++) {
                if (list[i].email == email) {
                    collaborator = list[i];
                    return collaborator;
                }
            }
            return null;
        }

        function getUsers(req,res){
            User.find({}, function (err,users) {
                if(err){
                    res.send(err);
                    return;
                }
                res.json(users);
            });
        }

        function userValidate(req, res){
            User.findOne({
                email: req.body.email
            }).select('_id fullname nickname email language password').exec(function(err,user){
                if(err) throw err;

                if(!user){
                    res.send({mensage: "email or password invalid"});
                }else if (user){
                    var validPassword = user.comparePassword(req.body.password);
                    if(!validPassword){
                        res.send({message: 'email or password invalid'});
                    }else{
                        var token = createToken(user);
                        res.json({
                            success: true,
                            mensage: "Sucessfuly login!",
                            id: user._id,
                            nickname: user.nickname,
                            email: user.email,
                            language: user.language,
                            token: token
                        });
                    }
                }
            });
        }

        function validate(req, res, next){

            var token = req.body.token || req.param('token') || req.headers['x-access-token'];
            if (token) {
                jsonwebtoken.verify(token, secretKey, function (err, decoded) {
                    if (err) {
                        res.status(403).send({success: false, message: "Failed to authenticate user"});
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                });
            } else {
                res.status(403).send({success: false, message: "No Token Provide"});
            }
        }

        function getUser(req, res){
            console.log(req.query.userid)
            User.findOne({
                _id: req.query.userid
            }).select('_id fullname nickname email language password photo').exec(function(err,user){
                if(err) throw err;
                if(!user){
                    res.send({mensage: "user invalid"});
                }else{
                        res.json({
                            success: true,
                            mensage: "Sucessfuly login!",
                            id: user._id,
                            nickname: user.nickname,
                            email: user.email,
                            language: user.language,
                            photo: user.photo
                        });

                }
            });

        }

    }

})();

