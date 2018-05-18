(function(){

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
                return deferred.resolve(new Error('Problem nao encontrado'));
            }
            deferred.resolve(problem)
        });
        return deferred.promise;
    }
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
    }
//Value Pie
function creatNewValue(socket, io, data){

    console.log("Save data " + data.tagValue.x)
    searchProblem(socket.room)
            .then(function(problem) {
                problem.valuepie.push(data.tagValue);
                problem.save(function(err, objUpdate) {
                    if( err  ){
                        console.log(err);
                    }else{
                        data.tagValue._id = objUpdate.valuepie[objUpdate.valuepie.length -1]._id;
                        io.sockets.in(socket.room).emit('onBroadcastValuePieAdd', data);
                    }
                });
            }).catch(function (err) {
            console.log(err)
        });
        
};



 function updateValuePie(socket,io,tagValue){
        var idproblem = socket.room;
        searchProblem(idproblem)
            .then(function(problem) {
                var id = tagValue._id;
                if(tagValue.value === '' || tagValue.value === undefined){
                    tagValue.value = 'new Value';
                }
                tagValue.openEdit = false;
                   Problem.findOneAndUpdate({ _id : idproblem, 'valuepie._id' : id },
                    { $set: {
                        'valuepie.$.slice' : tagValue.slice,
                        'valuepie.$.layer' : tagValue.layer,
                        'valuepie.$.value' : tagValue.value,
                        'valuepie.$.description' : tagValue.description,
                        'valuepie.$.x' : tagValue.x,
                        'valuepie.$.y' : tagValue.y,
                        'valuepie.$.openEdit' : false
                       }},function(err,objUpdate){
                        if(err){
                            console.log(err);
                        }else{
                            io.sockets.in(socket.room).emit('onBroadcastValuePieSave', tagValue);
                        }
                    });
            }).catch(function (err) {
                console.log(err)
            });
    }

function removeValue(idproblem,value){
        searchProblem(idproblem)
            .then(function(problem){
                problem.valuepie.pull(value);
                problem.save(function(err){
                    console.log(err);
                });
            }).catch(function(err){
            console.log(err);
        });
    }


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
    }

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
                Problem.findOneAndUpdate({_id: idproblem, 'stakeholders._id': id },
                    {$set: {'stakeholders.$.evaluationframing.problems': stakeholder.problems, 'stakeholders.$.evaluationframing.solutions': stakeholder.solutions  }},function(err,update){
                        if(err){
                            console.log(err)
                        }else{
                            io.sockets.in(socket.room).emit('onBroadcastFrameEdit', stakeholder);
                        }
                    });
            }).catch(function (err) {
                console.log(err)
            });
    }

    function removeStakeholder(socket,io,obj){
        var idProblem = socket.room;
        searchProblem(idProblem)
            .then(function(problem){
                problem.stakeholders.pull(obj.stakeholder);
                problem.save(function(err){
                    if(err){
                        console.log(err);
                    }else{
                        io.sockets.in(idProblem).emit('onBroadcastOnionRemove', obj.index);
                    }
                });
            }).catch(function(err){
                console.log(err);
            });
    }

    function removePostIt(idproblem,postit){
        searchProblem(idproblem)
            .then(function(problem){
                problem.postits.pull(postit);
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
                Problem.findByIdAndUpdate({_id: problem._id}, {$set: { 'semioticframework.physical': text }}, function(err, updated) {
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
                Problem.findByIdAndUpdate({_id: problem._id}, { $set : { 'semioticframework.empirical': text }}, function(err, updated) {
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
                Problem.findByIdAndUpdate({ _id : problem._id}, { $set : { 'semioticframework.syntatic': text }}, function(err, updated) {
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
                Problem.findByIdAndUpdate({ _id : problem._id}, { $set : { 'semioticframework.semantic': text }}, function(err, updated) {
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
                Problem.findByIdAndUpdate({ _id : problem._id }, { $set : { 'semioticframework.pragmatic': text }}, function(err, updated) {
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
                Problem.findByIdAndUpdate({ _id : problem._id }, { $set : { 'semioticframework.socialworld': text }}, function(err, updated) {
                    if( err || !updated ){
                        console.log(err);
                    }
                });
            }).catch(function (err) {
                console.log(err)
            });
    }

    function creatStakeholder(socket,io,data){
        var idproblem = socket.room;
        searchProblem(idproblem)
            .then(function(problem) {
                problem.stakeholders.push(data.stakeholder);
                problem.save(function(err, objUpdate) {
                    if( err  ){
                        console.log(err);
                    }else{
                        console.log();
                        data.stakeholder._id = objUpdate.stakeholders[objUpdate.stakeholders.length -1]._id;
                        io.sockets.in(socket.room).emit('onBroadcastOnionAdd', data);
                    }
                });
            }).catch(function (err) {
                console.log(err)
            });
    }


    function creatPostIt(socket,io,data){
        searchProblem(socket.room)
            .then(function(problem) {
                problem.postits.push(data.postit);
                problem.save(function(err, objUpdate) {
                    if( err  ){
                        console.log(err);
                    }else{
                        data.postit._id = objUpdate.postits[objUpdate.postits.length -1]._id;
                        io.sockets.in(socket.room).emit('onBroadcastOnion3LayerAdd', data);
                    }
                });
            }).catch(function (err) {
            console.log(err)
        });
    }

    function updateStakeholder(socket,io,stakeholder){
        var idproblem = socket.room;
        searchProblem(idproblem)
            .then(function(problem) {
                var id = stakeholder._id;
                if(stakeholder.name === '' || stakeholder.name === undefined){
                    stakeholder.name = 'newStakeholer';
                }
                stakeholder.openEdit = false;
                   Problem.findOneAndUpdate({ _id : idproblem, 'stakeholders._id' : id },
                    { $set: {
                        'stakeholders.$.name' : stakeholder.name,
                        'stakeholders.$.description' : stakeholder.description,
                        'stakeholders.$.onionlayer' : stakeholder.onionlayer,
                        'stakeholders.$.x' : stakeholder.x,
                        'stakeholders.$.y' : stakeholder.y,
                        'stakeholders.$.values' : stakeholder.values,
                        'stakeholders.$.openEdit' : false
                       }},function(err,objUpdate){
                        if(err){
                            console.log(err);
                        }else{
                            chanceStakeholder(socket,io,stakeholder);
                        }
                    });
            }).catch(function (err) {
                console.log(err)
            });
    }


    function updatePostIt(socket,io,postit){
        var idproblem = socket.room;
        searchProblem(idproblem)
            .then(function(problem) {
                var id = postit._id;
                if(postit.title === '' || postit.title === undefined){
                    postit.title = 'newPostit';
                }
                Problem.findOneAndUpdate({ _id : idproblem, 'postits._id' : id },
                    { $set: {
                        'postits.$.title' : postit.title,
                        'postits.$.description' : postit.description,
                        'postits.$.layer' : postit.layer,
                        'postits.$.x' : postit.x,
                        'postits.$.y' : postit.y
                    }},function(err,objUpdate){
                        if(err){
                            console.log(err);
                        }else{
                            io.sockets.in(socket.room).emit('onBroadcastOnion3LayerSave',postit);
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
                    Problem.findOneAndUpdate({ _id : idproblem, 'stakeholders._id' : id },
                        { $set : {'stakeholders.$' : stakeholder }},function(err){
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
            io.sockets.in(socket.room).emit('onNotifyON', {
                nickname: data.nickname,
                msg: 'LABEL_USER_ONLINE'
            });
        });



        socket.on('checkUsers', function(){

           /* var clients = io.sockets.adapter.rooms[socket.room];
            var numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;
            var userList = [];
            for (var clientId in clients ) {
                var clientSocket = io.sockets.connected[clientId];
                userList.push(clientSocket.username);
                clientSocket.emit('new event', 'Updates');
            }
            io.sockets.in(socket.room).emit('onCheckUsers', userList);*!/
        });

        socket.on('disconnectProblem', function(){
           /* socket.leave(socket.room);
             var clients = io.sockets.adapter.rooms[socket.room];
             var numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;
             for (var clientId in clients ) {
             var clientSocket = io.sockets.connected[clientId];
             console.log("Deixando o problema " + clientSocket.username);
             clientSocket.emit('new event', "Updates");
             }*/
        });

        socket.on('disconnectProblem', function(nickname){
             io.sockets.in(socket.room).emit('onNotifyOFF', {
                 nickname: nickname,
                 msg: 'LABEL_LEFT_PROJECT'
             });
        });




        socket.on('userON', function(nickname){
            io.sockets.in(socket.room).emit('onUserON',nickname);
        });

        socket.on('atualizarProblema', function (data) {
            if(data.update){
                Problem.update({ _id : socket.room}, { $set : { "description": data.description }}, function(err, updated) {
                    if( err || !updated ){
                        console.log(err);
                    }
                });
            }
            io.sockets.in(socket.room).emit('onAtualizarProblema', data);
        });

        socket.on('titleUpdate', function (data) {
            if(data.update){
                Problem.update({ _id : socket.room}, { $set : { "title": data.title }}, function(err, updated) {
                    if( err || !updated ){
                        console.log(err);
                    }
                });
            }
            io.sockets.in(socket.room).emit('onTitleUpdate', data);
        });

        socket.on('broadcastMove',function(stakeholder){
             updateStakeholder(socket,io,stakeholder);
        });

        socket.on('broadcastOnionEdit',function(id){
            io.sockets.in(socket.room).emit('onBroadcastOnionEdit',id);
        });

        socket.on('broadcastOnionAdd',function(data){
            creatStakeholder(socket,io,data);
        });

        socket.on('broadcastOnionRemove',function(obj){
            removeStakeholder(socket,io,obj);
        });

        socket.on('broadcastOnionSave',function(stakeholder){
            updateStakeholder(socket,io,stakeholder);
        });

        socket.on('broadcastOnionPosition',function(data){
            io.sockets.in(socket.room).emit('onBroadcastOnionPosition', data);
        });
// Onion3Layer


        socket.on('broadcastOnion3LayerMove',function(postit){
            updatePostIt(socket,io,postit);
        });

        socket.on('broadcastOnion3LayerEdit',function(obj){
            io.sockets.in(socket.room).emit('onBroadcastOnion3LayerEdit',obj);
        });

        socket.on('broadcastOnion3LayerAdd',function(data){
            creatPostIt(socket,io,data);
        });

        socket.on('broadcastOnion3LayerRemove',function(obj){
            removePostIt(socket.room,obj.postit);
            io.sockets.in(socket.room).emit('onBroadcastOnion3LayerRemove', obj.index);
        });

        socket.on('broadcastOnion3LayerSave',function(postit){
            updatePostIt(socket,io,postit);

        });

        socket.on('broadcastOnion3LayerPosition',function(data){
            io.sockets.in(socket.room).emit('onBroadcastOnion3LayerPosition', data);
        });


        //----------------------- Evaluation Framing ----------------------------

        function notifyEvaluationFraming(stakeholer){

        }

        socket.on('broadcastFrameSave',function(stakeholder){
            updateStakeholderEvaluationFraming(socket, io, stakeholder);

        });

        socket.on('broadcastFrameEdit',function(stakeholder){
            io.sockets.in(socket.room).emit('onBroadcastFrameEdit', stakeholder);
        });


        // -- Semiotic Framework ----------------------------------------------------------------

        socket.on('updateSocialWorld',function(obj){
            //Validar o Salvar e Salvar no banco.
            if(obj.update){
                saveSocialWorld(socket.room, obj.text);
            }
            io.sockets.in(socket.room).emit('onUpdateSocialWorld', obj);
        });

        socket.on('updatePragmatic',function(obj){
            //Validar o Salvar e Salvar no banco.
            if(obj.update){
                savePragmatic(socket.room, obj.text);
            }
            io.sockets.in(socket.room).emit('onUpdatePragmatic', obj);
        });

        socket.on('updateSemantic',function(obj){
            //Validar o Salvar e Salvar no banco.
            if(obj.update){
                saveSemantic(socket.room, obj.text);
            }
             io.sockets.in(socket.room).emit('onUpdateSemantic', obj);
        });

        socket.on('updateSyntatic',function(obj){
            //Validar o Salvar e Salvar no banco.
            if(obj.update){
                saveSyntatic(socket.room, obj.text);
            }
             io.sockets.in(socket.room).emit('onUpdateSyntatic', obj);
        });

        socket.on('updateEmpirical',function(obj){
            //Validar o Salvar e Salvar no banco.
            if(obj.update){
                saveEpirical(socket.room, obj.text);
            }
            io.sockets.in(socket.room).emit('onUpdateEmpirical', obj);
        });

        socket.on('updatePhysical',function(obj){
            //Validar o Salvar e Salvar no banco.
            if(obj.update){
                savePhysical(socket.room, obj.text);
            }
            io.sockets.in(socket.room).emit('onUpdatePhysical', obj);
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

    // ValuePie ---------------------------------------------------------

        socket.on('broadcastValuePieAdd',function(obj){
            creatNewValue(socket,io,obj);
        });

        socket.on('broadcastValuePieSave',function(obj){
            updateValuePie(socket,io,obj);
        });

        socket.on('broadcastTagValueRemove',function(obj){
            removeValue(socket.room,obj.tagValue);
            io.sockets.in(socket.room).emit('onBroadcastTagValueRemove', obj.index);
        });

    };

    function chanceStakeholder(socket,io,stakeholder){
        io.sockets.in(socket.room).emit('onBroadcastOnionSave', stakeholder);
        io.sockets.in(socket.room).emit('onUpdateStakeholder', stakeholder);
    }

})();