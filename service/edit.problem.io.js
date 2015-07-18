
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
};
//Insert Message Chat

function insertMessage(socket,io,obj){
    var idproblem = socket.room;
    searchProblem(idproblem)
        .then(function(problem) {
            problem.chat.push(obj);
            problem.save(function(err, objUpdate) {
                if( err  ){
                    console.log(err);
                }else{
                    io.sockets.in(socket.room).emit('onBroadcastChat', objUpdate.chat);
                }
            });
        }).catch(function (err) {
            console.log(err)
        });
};


//---- insert carf -----

function creatNewCARF(socket, io, carf){
    var idproblem = socket.room;
    searchProblem(idproblem)
        .then(function(problem) {
            var id = carf._id;
            delete carf._id;
            problem.carf.push(carf);
            problem.save(function(err, objUpdate) {
                if( err  ){
                    console.log(err);
                }else{
                    io.sockets.in(socket.room).emit('onBroadcastCARFadd', objUpdate.carf[objUpdate.carf.length -1]);
                }
            });
        }).catch(function (err) {
            console.log(err)
        });
};

function removeCARF(idproblem,carf){
    searchProblem(idproblem)
        .then(function(problem){
            problem.carf.pull(carf);
            problem.save(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        });
}

function updateStakeholderEvaluationFraming(socket, io, stakeholder){
        var idproblem = socket.room;
        searchProblem(idproblem)
            .then(function(problem) {
                var id = stakeholder._id;
                stakeholder.openEdit = false;
                Problem.findOneAndUpdate({ _id: idproblem, "stakeholders._id": id },
                    {"$set": {"stakeholders.$.evaluationframing.problems": stakeholder.problems, "stakeholders.$.evaluationframing.solutions": stakeholder.solutions  }},function(err,update){
                        if(err){
                            console.log(err)
                        }else{
                            io.sockets.in(socket.room).emit('onBroadcastFrameSave', stakeholder);
                        }
                    });
            }).catch(function (err) {
                console.log(err)
            });
}

function removeStakeholder(idproblem,stakeholder){
   searchProblem(idproblem)
       .then(function(problem){
           problem.stakeholders.pull(stakeholder);
           problem.save(function(err){
               console.log(err);
           });
       }).catch(function(err){
          console.log(err);
       });
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



function creatStakeholder(socket,io,stakeholder){
    var idproblem = socket.room;
    searchProblem(idproblem)
        .then(function(problem) {
                var id = stakeholder._id;
                delete stakeholder._id;
                problem.stakeholders.push(stakeholder);
                problem.save(function(err, objUpdate) {
                    if( err  ){
                        console.log(err);
                    }else{
                        io.sockets.in(socket.room).emit('onBroadcastOnionAdd', objUpdate.stakeholders[objUpdate.stakeholders.length -1]);
                    }
                });
        }).catch(function (err) {
            console.log(err)
        });
};

function updateStakeholder(socket,io,stakeholder){
    var idproblem = socket.room;
    searchProblem(idproblem)
        .then(function(problem) {
                var id = stakeholder._id;
                stakeholder.openEdit = false;
                Problem.findOneAndUpdate({ "_id": idproblem, "stakeholders._id": id },
                    {"$set": {"stakeholders.$": stakeholder }},function(err){
                        if(err){
                            console.log(err)
                        }else{
                            chanceStakeholder(socket,io,stakeholder);
                        }
                    });
        }).catch(function (err) {
            console.log(err)
        });
}

function saveorUpdate(socket,io,stakeholder){
    var idproblem = socket.room;
    searchProblem(idproblem)
        .then(function(problem) {
            if(existStakeholder(problem.stakeholders,stakeholder._id)){
                var id = stakeholder._id;
                Problem.findOneAndUpdate({ "_id": idproblem, "stakeholders._id": id },
                    {"$set": {"stakeholders.$": stakeholder }},function(err){
                        if(err){
                            console.log(err)
                        }else{
                            chanceStakeholder(socket,io,stakeholder);
                        }
                    });
            }else{
                var id = stakeholder._id;
                delete stakeholder._id;
                problem.stakeholders.push(stakeholder);
                problem.save(function(err, objUpdate) {
                    if( err  ){
                        console.log(err);
                    }else{
                        chanceStakeholder(socket,io,objUpdate.stakeholders[objUpdate.stakeholders.length -1]);
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

    socket.on('broadcastOnionEdit',function(id){
        console.log("Editando..................... " + id);
        io.sockets.in(socket.room).emit('onBroadcastOnionEdit',id);
    });

    socket.on('broadcastOnionAdd',function(data){
        creatStakeholder(socket,io,data);
    });

    socket.on('broadcastOnionRemove',function(obj){
        //Notificar interessados.
        removeStakeholder(socket.room,obj.stakeholder);
        io.sockets.in(socket.room).emit('onBroadcastOnionRemove', obj.index);
    });

    socket.on('broadcastOnionSave',function(data){
        console.log("ID problema   " + socket.room);
        updateStakeholder(socket,io,data);
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
        updateStakeholderEvaluationFraming(socket, io, stakeholder);

    });

    socket.on('broadcastFrameEdit',function(stakeholder){
        console.log("ID problema   " + socket.room);
        console.log(stakeholder._id);
        io.sockets.in(socket.room).emit('onBroadcastFrameEdit', stakeholder);
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

    // ----- CARF --------------------------------------------------
    socket.on('broadcastCARFadd',function(carf){
        creatNewCARF(socket,io,carf);
    });

    socket.on('broadcastCARFremove',function(obj){
        removeCARF(socket.room,obj.carf);
        io.sockets.in(socket.room).emit('onBroadcastCARFremove', obj.index);
    });

    // ---- Chat -----------------
    socket.on('broadcastChat',function(message){
        var obj = {
            nickname: socket.username,
            msg: message,
            time: new Date()
        };
        insertMessage(socket,io,obj);
    });
};

/*function getTime(){
    var time = new Date();
    return time.getDate() + "/" + time.getMonth() + "/" + time.getFullYear() + "[" + time.getHours() + ":" + time.getMinutes() + "]";
}*/

function chanceStakeholder(socket,io,stakeholder){
    //Sem mundaça
    io.sockets.in(socket.room).emit('onBroadcastOnionSave', stakeholder);
    io.sockets.in(socket.room).emit('onUpdateStakeholder', stakeholder);
};
