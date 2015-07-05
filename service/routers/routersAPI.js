/**
 * Created by JOSEVALDERLEI on 02/07/2015.
 */


var rescuepassword = require('../models/rescuepasswordController');
var accessController = require('../models/accessController');

module.exports =  function(app, express){
    var api = express.Router();

    api.use("/rescuepasswd", rescuepassword());

    api.use("/",accessController());
    return api;
};