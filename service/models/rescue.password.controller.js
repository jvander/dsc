'use strict';

var User = require('../models/user');
var config = require('../../config.server');
var configMail = require('../../configmail');
var router = require('express').Router();

function getToken(){
  return require('crypto').randomBytes(32).toString('hex');
}

function sendMail(mailOptions){
  require('../sendmailDSC')(mailOptions);
}

module.exports = function () {

  router.route('/')
      .post(sendTokenEmail);
  router.route('/newpasswd/')
      .post(setNewPassword);

  return router;

  function sendTokenEmail(req, res) {

    User.findOne({
      email: req.body.email
    }).select('_id nickname email').exec(function(err,user){
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
            'http://'+ configMail.serverURL +':3000/#/newpassword/?mytoken=' + user.resetPasswordToken
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



  function setNewPassword(req, res){
   User.findOne({resetPasswordToken: req.query.mytoken, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        res.json({
          success: false,
          mensage: "Password reset token is invalid or has expired."
        });
      }else{
        user.password = req.query.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.save(function (err) {
          if (err) {
            console.log(err);
            return;
          }
        });
        var mailOptions = {
          to: user.email,
          from: configMail.email,
          subject: 'Your password has been changed in DSC System.',
          text: 'Hello ' + user.nickname +',\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
        sendMail(mailOptions);
        res.json({
          success: true,
          message: "Your password has changed"
        });
      }
    });
  }
};




