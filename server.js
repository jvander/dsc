/**
 * Created by JOSEVALDERLEI on 25/06/2015.
 */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config.server');
const mongoose = require('mongoose');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dpi = require('./service/edit.problem.io');
mongoose.Promise = global.Promise;

const options = {
  promiseLibrary: global.Promise,
  useMongoClient: true,
};

var connectMongoDB = function() {
  mongoose.connect(config.database.uri, options)
    .then(function() {
      const admin = new mongoose.mongo.Admin(mongoose.connection.db);
      admin.buildInfo(function(err, info) {
        if (err) {
          console.err('Error getting MongoDB info: ${err}');
        } else {
          console.log('Connection to MongoDB (version ${info.version}) opened successfully!');
        }
      });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB: ${err}');
        setTimeout(connectMongoDB, 5000);
    });


}
connectMongoDB();


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + config.clientPath));

/*
var api = require('./service/routes/api')(app,express);
app.use('/api',api);
*/

var api = require('./service/routers/routersAPI')(app,express);
app.use('/api', api);


app.get("*", function(req,res){
    res.sendFile(__dirname + config.viewPath);
});

io.on('connection', function(socket) {
    dpi(io, socket);
});


http.listen(config.port, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Listening on port " + config.port);
    }
});