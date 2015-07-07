/**
 * Created by JOSEVALDERLEI on 07/07/2015.
 */
var router = require('express').Router();

module.exports = function () {

    router.route('/newproblem/')
        .post();
    router.route('/getproblem/')
        .get();

    return router;

}