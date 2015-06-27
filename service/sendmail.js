

       // user: "socialawarenessdesign@gmail.com",
       // pass: "sad123!@#"


var nodemailer = require('nodemailer');
var configMail = require('../configmail');


// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: configMail.email,
        pass: configMail.password
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: configMail.email, // sender address
    to: 'destinatario@algo...', // list of receivers
    subject: 'Teste', // Subject line
    text: 'Hello world', // plaintext body
    html: '<b>Não Responda este eamil!</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});