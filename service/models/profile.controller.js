/**
 * Created by JOSEVALDERLEI on 28/07/2015.
 */

(function(){

    "use strict";

    var User = require('../models/user');
    var router = require('express').Router();


    module.exports = function () {

        router.route('/photo')
            .post(postImage)

        return router;
        function postImage(req,res){
            var contentType  = req.body.photo.substring((req.body.photo.indexOf(':')+1),req.body.photo.indexOf(';'))
             if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
                return res.status(400).send('Unsupported file type.');
            }
                User.findByIdAndUpdate({_id: req.body.userid}, { $set : { 'photo': req.body.photo }}, function(err, updated) {
                    if (err) {
                        res.json({
                            success: false,
                            mensage: "Sorry!! Problems!",
                        });
                    } else {
                        res.json({
                            success: true,
                            mensage: "Update Your Photo!",
                        });
                    }
                });


        }
    }

})();



/*
fs.readFile(image_origial, function(err, original_data){
    fs.writeFile('image_orig.jpg', original_data, function(err) {});
    var base64Image = new Buffer(original_data, 'binary').toString('base64');
    var decodedImage = new Buffer(base64Image, 'base64').toString('binary');
    console.log(base64Image);
    fs.writeFile('image_decoded.jpg', decodedImage, function(err) {});
});*/

/*

var form = new multiparty.Form();
form.keepExtensions = true;
form.uploadDir = 'd:/7/';
form.parse(req, function(err, fields, files){
    if (err) return res.end('You found error');
    var file = files.file[0];
    var contentType = file.headers['content-type'];
    var tmpPath = file.path;
    var extIndex = tmpPath.lastIndexOf('.');
    var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
    var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);

    // Server side file type checker.
    if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
        return res.status(400).send('Unsupported file type.');
    }



    fs.readFile(tmpPath, function(err, original_data){
        var base64Image = new Buffer(original_data, 'binary').toString('base64');
        console.log(base64Image);
        User.findByIdAndUpdate({_id: fields.id}, { $set : { 'photo': 'data:'+contentType+';base64,'+base64Image}}, function(err, updated) {
            if (err || !updated) {
                console.log(err);
            } else {
                console.log(updated)
            }
        });
    });



});

form.on('progress', function(bytesReceived, bytesExpected) {
    console.log(bytesReceived + ' ' + bytesExpected);
});

form.on('error', function(err) {
    res.writeHead(400, {'content-type': 'text/plain'}); // 400: Bad Request
    res.end('error:\n\n'+util.inspect(err));
});

res.end('Done');
return;

*/
