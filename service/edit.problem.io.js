
'use strict';
var Problem = require('./models/problem/problem');
var Q = require('q');

function existStakeholder(list, id){
    for(var i = 0; i < list.length; i++){
        if(list[i]._id == id){
            return true;
        }
    }
    false;
}

function addStakeholder(result){
    var deferred = Q.defer();
    var problem = result.problem;
    var stakeholder = result.stakeholder;
    if(existStakeholder(problem.stakeholders,stakeholder._id)){
        problem.stakeholders.push({
            _id: stakeholder._id,
            name: stakeholder.name,
            onionlayer: stakeholder.onionlayer,
            description: stakeholder.description,
            x: stakeholder.x,
            y: stakeholder.y
        });
    }else{

        problem.stakeholders.push({
            name: stakeholder.name,
            onionlayer: stakeholder.onionlayer,
            description: stakeholder.description,
            x: stakeholder.x,
            y: stakeholder.y
        });

    }
    deferred.resolve(problem);
    return deferred.promise;

};



function saveorUpdate(idproblem,stakeholder){
    searchStakeholder(idproblem)
        .then(function(problem) {
            return {problem: problem, stakeholder: stakeholder}
        }).then(addStakeholder)
            .then(function (problem) {
            console.log(problem)
            problem.save(function(err) {
                if(err){
                    console.log(err);
                }
            })
        }).catch(function (erro) {
            console.log(erro);
        });
}

function searchStakeholder(idproblem, idstakeholder){
    var deferred = Q.defer();
    Problem.findOne({ _id: idproblem }).exec(function(err,problem){
        if(err) {
            return deferred.reject(err)
        };
        if(!problem){
            return deferred.resolve(new Error("Problem não encontrado"));
        }
        deferred.resolve(problem)
    });
    return deferred.promise;
}




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
        console.log("Editando..................... " + data);
        io.sockets.in(socket.room).emit('onBroadcastOnionEdit', data);
    });

    socket.on('broadcastOnionAdd',function(data){
        console.log("Addicionando.................. " + data);
        io.sockets.in(socket.room).emit('onBroadcastOnionAdd', data);
    });

    socket.on('broadcastOnionRemove',function(data){
        console.log("Removendo................ " + data);
        io.sockets.in(socket.room).emit('onBroadcastOnionRemove', data);
    });

    socket.on('broadcastOnionSave',function(data){
        console.log("ID problema   " + socket.room);

        //saveorUpdate(socket.room, data);


        /*Problem.update({_id: socket.room}, {$push: {stakeholders: data}}, function(err, updated) {
            if( err || !updated ){
                console.log(err);
            }
        });*/


        io.sockets.in(socket.room).emit('onBroadcastOnionSave', data);
    });

    socket.on('broadcastOnionPosition',function(data){
        console.log("Posição........... " + data.y);
        io.sockets.in(socket.room).emit('onBroadcastOnionPosition', data);
    });

};

