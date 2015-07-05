/**
 * Created by JOSEVALDERLEI on 16/06/2015.
 */
var User = require('../models/user');
var config = require('../../config.server');
var configMail = require('../../configmail');
var secretKey = config.secretKey;

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

function getToken(){
    return require('crypto').randomBytes(32).toString('hex');
}

function sendMail(mailOptions){
    require('../sendmailDSC')(mailOptions);
}

module.exports =  function(app, express){

    var api = express.Router();

    api.post('/signup', function(req,res){
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
    });


    api.post('/newpassword', function(req, res){

        }
    );


    api.get('/setpassword/', function(req, res){
        console.log(req.body.mytoken);
        User.findOne({resetPasswordToken: req.body.mytoken, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
                res.json({
                    success: false,
                    message: "Password reset token is invalid or has expired."
                });
            }else{
                    res.json({
                        success: true,
                        message: "Change your password",
                        mytoken: user.resetPasswordExpires
                    });
            }
        });
    });

    api.post('/rescuepassword', function(req, res){

            console.log(req.body.email);

            User.findOne({
                email: req.body.email
            }).select('id nickname email').exec(function(err,user){
                if(err) throw err;
                if(!user){
                    res.json({
                            success: false,
                            message: "Not email " + req.body.email
                        }
                    );
                }else if (user){
                    user.resetPasswordToken = getToken();
                    user.resetPasswordExpires = Date.now() + 21600000; // 6 horas
                    console.log(user.resetPasswordToken);
                     user.save(function (err) {
                        if(err){
                            console.log(err);
                            return;
                        }

                         var mailOptions = {
                             from: configMail.email, // sender address
                             to: user.email, // list of receivers
                             subject: 'Password DSC', // Subject line
                             text: 'Oi ' + user.nickname + '! Para alterar sua senha clique no link.' +
                             'http://'+ configMail.serverURL +':3000/?mytoken=' + user.resetPasswordToken,// plaintext body
                         };

                         sendMail(mailOptions);
                        res.json({
                            success: true,
                            message: "Send email for " + req.body.email
                        })
                    })
                }else{
                    res.json({
                        success: false,
                        message: "Rescue not possible."
                    })

                }
            });
        }
    );


    api.get('/users',function(req,res){
        User.find({}, function (err,users) {
           if(err){
               res.send(err);
               return;
           }
            res.json(users);
        });
    });

    api.post('/login', function(req,res){
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
    });



    api.use(function(req, res, next){
        res.header("Access-Control-Allow-Origin", "/api/setpassword/");
        next();
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

    });

    api.get('/me', function(req, res) {
        res.send(req.decoded);
    });

    return api;
};


