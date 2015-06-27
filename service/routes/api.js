/**
 * Created by JOSEVALDERLEI on 16/06/2015.
 */
var User = require('../models/user');
var config = require('../../config.server');
var secretKey = config.secretKey;

var jsonwebtoken = require('jsonwebtoken');

function createToken(user){
    var token = jsonwebtoken.sign({
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        language: user.language
      }, secretKey,{
        expirtesInMinute: 1440
    });

    return token;
}

module.exports =  function(app, express){
  var api = express.Router();
    api.post('/signup', function(req,res){
       var user = new User({
           name: req.body.name,
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
            res.json({message: 'User has been created'});
        })
    });
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
        console.log('Somebody just came to our app!');

        var token = req.body.token || req.param('token') || req.headers['x-access-token'];
        if(token){
            jsonwebtoken.verify(token,secretKey, function(err, decoded){
                if(err){
                    res.status(403).send({ success: false, message: "Failed to authenticate user"});
                }else{
                    req.decoded = decoded;
                    next();
                }
            });
        }else{
            res.status(403).send({ success: false, mensage: "No Token Provide"});
        }
    });

    api.get('/me', function(req, res) {
        res.send(req.decoded);
    });


    return api;
};


