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

