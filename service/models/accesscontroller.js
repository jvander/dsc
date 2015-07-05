/**
 * Created by JOSEVALDERLEI on 16/06/2015.
 */
var User = require('../models/user');
var config = require('../../config.server');
var secretKey = config.secretKey;
var router = require('express').Router();

var jsonwebtoken = require('jsonwebtoken');



function createToken(user){
    var token = jsonwebtoken.sign({
        id: user.id,
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
                })
            }else if (user){
                res.json({
                    success: false,
                    mensage: "User not has been created!",
                });

            }
        });

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
        }).select('fullname nickname email language password').exec(function(err,user){
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
        res.send(req.decoded);
    }

};



