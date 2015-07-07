/**
 * Created by JOSEVALDERLEI on 02/07/2015.
 */


var rescuepassword = require('../models/rescue.password.controller');
var accessController = require('../models/access.controller');
var problemController = require('../models/problem/problem.controller');

module.exports =  function(app, express){
    var api = express.Router();

    api.use("/rescuepasswd", rescuepassword());

    api.use("/",accessController());
    api.use("/",problemController());
    return api;
};