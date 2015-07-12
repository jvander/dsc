
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

function saveorUpdate(idproblem,stakeholder){
    searchStakeholder(idproblem)
        .then(function(problem) {
            if(existStakeholder(problem.stakeholders,stakeholder._id)){
                console.log("------------------------------------------------------------------------");
                console.log(problem)
                console.log("------------------------------------------------------------------------");
                Problem.findByIdAndUpdate({'_id' : problem._id, "stakeholders._id": stakeholder._id }, { $set: { "stakeholders.$": stakeholder }}, { upsert: true }, function(err, updated) {
                    if( err || !updated ){
                        console.log(err);
                    }
                });




            }else{
                console.log("Não Existe............................................");
                var newstakeholder = {
                    name: stakeholder.name,
                    onionlayer: stakeholder.onionlayer,
                    description: stakeholder.description,
                    x: stakeholder.x,
                    y: stakeholder.y
                };

                Problem.findByIdAndUpdate({_id: idproblem}, {$push: { stakeholders: newstakeholder }}, function(err, updated) {
                    if( err || !updated ){
                        console.log(err);
                    }
                });
            }
        }).catch(function (err) {
            console.log(err)
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
        console.log('>>>>>>>>>>>>>>++++++++++++++++++>>>>>>>>>' + data);
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

        saveorUpdate(socket.room, data);


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

    //----------------------- Evaluation Frameing ----------------------------


    socket.on('broadcastFrameSave',function(stakeholder){
        console.log("ID problema   " + socket.room);
        console.log(stakeholder._id);
        console.log('>>>>>>>>>>>>>>++++++++++++++++++>>>>>>>>>' + stakeholder.onionlayer);
        //Salvar discution...
        io.sockets.in(socket.room).emit('onBroadcastFrameSave', stakeholder);
    });


};

