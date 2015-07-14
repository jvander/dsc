
'use strict';
var Problem = require('./models/problem/problem');
var Q = require('q');

//Save SocialWorld
function searchProblem(idproblem){
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
function savePhysical(idproblem, text){
    searchProblem(idproblem)
        .then(function(problem){
            Problem.findByIdAndUpdate({_id: problem._id}, {$set: { "semioticframework.physical": text }}, function(err, updated) {
                if( err || !updated ){
                    console.log(err);
                }
            });
        }).catch(function (err) {
            console.log(err)
        });
}
function saveEpirical(idproblem, text){
    searchProblem(idproblem)
        .then(function(problem){
            Problem.findByIdAndUpdate({_id: problem._id}, {$set: { "semioticframework.empirical": text }}, function(err, updated) {
                if( err || !updated ){
                    console.log(err);
                }
            });
        }).catch(function (err) {
            console.log(err)
        });
}

function saveSyntatic(idproblem, text){
    searchProblem(idproblem)
        .then(function(problem){
            Problem.findByIdAndUpdate({_id: problem._id}, {$set: { "semioticframework.syntatic": text }}, function(err, updated) {
                if( err || !updated ){
                    console.log(err);
                }
            });
        }).catch(function (err) {
            console.log(err)
        });
}

function saveSemantic(idproblem, text){
    searchProblem(idproblem)
        .then(function(problem){
            Problem.findByIdAndUpdate({_id: problem._id}, {$set: { "semioticframework.semantic": text }}, function(err, updated) {
                if( err || !updated ){
                    console.log(err);
                }
            });
        }).catch(function (err) {
            console.log(err)
        });
}

function savePragmatic(idproblem, text){
    searchProblem(idproblem)
        .then(function(problem){
            Problem.findByIdAndUpdate({_id: problem._id}, {$set: { "semioticframework.pragmatic": text }}, function(err, updated) {
                if( err || !updated ){
                    console.log(err);
                }
            });
        }).catch(function (err) {
            console.log(err)
        });
}

function saveSocialWorld(idproblem, text){
    searchProblem(idproblem)
        .then(function(problem){
            Problem.findByIdAndUpdate({_id: problem._id}, {$set: { "semioticframework.socialworld": text }}, function(err, updated) {
                if( err || !updated ){
                    console.log(err);
                }
            });
        }).catch(function (err) {
            console.log(err)
        });
}


function existStakeholder(list, id){
    for(var i = 0; i < list.length; i++){
        if(list[i]._id == id){
            return true;
        }
    }
    false;
}

function saveorUpdate(idproblem,stakeholder){
    searchProblem(idproblem)
        .then(function(problem) {
            if(existStakeholder(problem.stakeholders,stakeholder._id)){

                var id = stakeholder._id;
                Problem.findOneAndUpdate(
                    { "_id": idproblem, "stakeholders._id": id },
                    {
                        "$set": {
                            "stakeholders.$": stakeholder
                        }
                    },
                    function(err) {
                        console.log(err,problem);
                    }
                );
            }else{
                var id = stakeholder._id;
                delete stakeholder._id;
                problem.stakeholders.push(stakeholder);
                problem.save(function(err) {
                    if( err  ){
                        console.log(err);
                    }
                });
            }
        }).catch(function (err) {
            console.log(err)
        });
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

    //----------------------- Evaluation Framing ----------------------------

    function notifyEvaluationFraming(stakeholer){

    }
    socket.on('broadcastFrameSave',function(stakeholder){
        console.log("ID problema   " + socket.room);
        console.log(stakeholder._id);
        console.log('>>>>>>>>>>>>>>++++++++++++++++++>>>>>>>>>' + stakeholder.onionlayer);
        //Salvar discution...
        io.sockets.in(socket.room).emit('onBroadcastFrameSave', stakeholder);
    });


    // -- Semiotic Framework ----------------------------------------------------------------

    socket.on('updateSocialWorld',function(obj){
        //Validar o Salvar e Salvar no banco.
        if(obj.update){
            saveSocialWorld(socket.room, obj.text);
        }
        console.log('Problema: ' + socket.room + ' >>>>>>>>++++++++++++++++++>>>>>>>>> ' + obj.update);
        console.log('Problema: ' + socket.room + ' >>>>>>>>++++++++++++++++++>>>>>>>>> ' + obj.text);
        io.sockets.in(socket.room).emit('onUpdateSocialWorld', obj.text);
    });

    socket.on('updatePragmatic',function(obj){
        //Validar o Salvar e Salvar no banco.
        if(obj.update){
            savePragmatic(socket.room, obj.text);
        }
        console.log('Problema: ' + socket.room + ' >>>>>>>>++++++++++++++++++>>>>>>>>> ' + obj.update);
        console.log('Problema: ' + socket.room + ' >>>>>>>>++++++++++++++++++>>>>>>>>> ' + obj.text);
        io.sockets.in(socket.room).emit('onUpdatePragmatic', obj.text);
    });

    socket.on('updateSemantic',function(obj){
        //Validar o Salvar e Salvar no banco.
        if(obj.update){
            saveSemantic(socket.room, obj.text);
        }
        console.log('Problema: ' + socket.room + ' >>>>>>>>++++++++++++++++++>>>>>>>>> ' + obj.update);
        console.log('Problema: ' + socket.room + ' >>>>>>>>++++++++++++++++++>>>>>>>>> ' + obj.text);
        io.sockets.in(socket.room).emit('onUpdateSemantic', obj.text);
    });

    socket.on('updateSyntatic',function(obj){
        //Validar o Salvar e Salvar no banco.
        if(obj.update){
            saveSyntatic(socket.room, obj.text);
        }
        console.log('Problema: ' + socket.room + ' >>>>>>>>++++++++++++++++++>>>>>>>>> ' + obj.update);
        console.log('Problema: ' + socket.room + ' >>>>>>>>++++++++++++++++++>>>>>>>>> ' + obj.text);
        io.sockets.in(socket.room).emit('onUpdateSyntatic', obj.text);
    });

    socket.on('updateEmpirical',function(obj){
        //Validar o Salvar e Salvar no banco.
        if(obj.update){
            saveEpirical(socket.room, obj.text);
        }
        console.log('Problema: ' + socket.room + ' >>>>>>>>++++++++++++++++++>>>>>>>>> ' + obj.update);
        console.log('Problema: ' + socket.room + ' >>>>>>>>++++++++++++++++++>>>>>>>>> ' + obj.text);
        io.sockets.in(socket.room).emit('onUpdateEmpirical', obj.text);
    });

    socket.on('updatePhysical',function(obj){
        //Validar o Salvar e Salvar no banco.
        if(obj.update){
            savePhysical(socket.room, obj.text);
        }
        console.log('Problema: ' + socket.room + ' >>>>>>>>++++++++++++++++++>>>>>>>>> ' + obj.update);
        console.log('Problema: ' + socket.room + ' >>>>>>>>++++++++++++++++++>>>>>>>>> ' + obj.text);
        io.sockets.in(socket.room).emit('onUpdatePhysical', obj.text);
    });



};

