
(function(){

    var nodemailer = require('nodemailer');
    var configMail = require('../configmail');

    module.exports =  function(mailOptions){

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: configMail.email,
                pass: configMail.password
            }
        });

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

    }




})();