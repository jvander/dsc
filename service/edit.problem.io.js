
'use strict';
var Problem = require('./models/problem/problem');


module.exports = function(io,socket) {

    socket.on('initProblem', function(data){
        socket.room = data.idproblem;
        socket.join(data.idproblem);
        socket.username = data.nickname;
        console.log("Pronto para editar problema com id " + data.idproblem + " para o user " + socket.username);
    });

    socket.on('disconnectProblem', function(){
        delete usernames[socket.username];
        io.emit('updateusers', usernames);
        socket.leave(socket.room);
    });

    socket.on('atualizarProblema', function (data) {
        if(data.update){
            Problem.update({_id: socket.room}, {$set: {description: data.description}}, function(err, updated) {
                if( err || !updated ){
                    console.log(err);
                }
            });
        }
        io.sockets.in(socket.room).emit('onAtualizarProblema', data);
    });


    socket.on('broadcastOnionEdit',function(data){
        console.log("Edit " + data);
        io.sockets.in(socket.room).emit('onBroadcastOnionEdit', data);
    });


    socket.on('broadcastOnionAdd',function(data){
        console.log("Add " + data);
        io.sockets.in(socket.room).emit('onBroadcastOnionAdd', data);
    });


    socket.on('broadcastOnionRemove',function(data){
        console.log("Remove " + data);
        io.sockets.in(socket.room).emit('onBroadcastOnionRemove', data);
    });

    socket.on('broadcastOnionSave',function(data){
        console.log("Save " + data);
        io.sockets.in(socket.room).emit('onBroadcastOnionSave', data);
    });

    socket.on('broadcastOnionPosition',function(data){
        console.log("Posição........... " + data.y);
        io.sockets.in(socket.room).emit('onBroadcastOnionPosition', data);
    });

};

