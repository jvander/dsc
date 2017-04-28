/**
 * Created by JOSEVALDERLEI on 07/07/2015.
 */
var router = require('express').Router();
var Problem = require('../../models/problem/problem');
var User = require('../../models/user');
var configMail = require('../../../configmail');
var Q = require('q');

function sendMail(mailOptions){
    require('../../sendmailDSC')(mailOptions);
}

module.exports = function () {

    router.route('/newproblem/')
        .post(addNewProblem);
    router.route('/getproblem/')
        .get(getProblem);
    router.route('/getproblemreport/')
        .get(getProblemReport);
    router.route('/getproblems/')
        .get(getAllProblems);
    router.route('/getproblemscollaborator/')
        .get(getAllProblemsCollaborator);
    router.route('/invite/')
        .post(addCollaborator);
    router.route('/getcollaborators/')
        .get(getAllCollaborators);
    router.route('/removecollaborator/')
        .get(removeCollaborator);
    router.route('/getonion/')
        .get(findOnion);
    router.route('/getevaluation/')
        .get(findEvaluationFraming);
    router.route('/getsemiotic/')
        .get(findSemioticFramework);
    router.route('/removeproblem/')
        .get(removeProblem);
    router.route('/getcarf/')
        .get(findCarf);
    router.route('/historychat/')
        .get(getHistoryChat);
   router.route('/getonion3layer/')
        .get(findOnion3layer);

    router.route('/ajuste/')
        .post(getAllProblemsAjuste);





    return router;

    function searchSemioticFramework(id){
        var deferred = Q.defer();
        Problem.findOne({
            _id: id
        }).select('semioticframework').exec(function (err, problem){
            if(err) {
                return deferred.reject(err)
            };
            if(!problem){
                return deferred.reject(new Error("Problem nao encontrado"));
            }
            deferred.resolve(problem)
        });
        return deferred.promise;
    }

    function findSemioticFramework(req, res){
        searchSemioticFramework(req.query.idproblem)
            .then(function(problem){
                res.json({
                        success: true,
                    semioticframework: problem.semioticframework
                    });
            }).catch(function (erro) {
                res.status(400)
                    .json({
                        message: erro.message
                    })
            });
    };


    function searchCarf(id){
        var deferred = Q.defer();
        Problem.findOne({
            _id: id
        }).select('stakeholders carf').exec(function (err, problem){
            if(err) {
                return deferred.reject(err)
            };
            if(!problem){
                return deferred.reject(new Error("Problem não encontrado"));
            }
            deferred.resolve(problem)
        });
        return deferred.promise;
    }

    function buildStakeholderList(stakeholders){
        var list = [];
        stakeholders.forEach(function(stakeholder){
                list.push((stakeholder.name));
        });
        return list;

    }

    function findCarf(req,res){
        searchCarf(req.query.idproblem)
            .then(function(problem){
                var stakeholderList = buildStakeholderList(problem.stakeholders);
                res.json({
                    success: true,
                    stakeholders: stakeholderList,
                    carf: problem.carf
                });
            }).catch(function (erro) {
                res.status(400)
                    .json({
                        message: erro.message
                    })
            });
    }

    function findCollaboratorsForProblem(id){
        var deferred = Q.defer();
        Problem.findOne({
            _id: id
        }).select('collaborators').exec(function(err,problem){
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

    function getAllCollaborators(req,res){
        findCollaboratorsForProblem(req.query.idproblem)
            .then(function (problem) {
                res.json({
                    success: true,
                    collaborators: problem.collaborators
                }
                );
            }).catch(function (erro) {
                res.status(400)
                    .json({
                        message: erro.message
                    })
            });
    }

    function searchUser(id){
        var deferred = Q.defer();
        User.findOne({
            _id: id
        }).select('fullname nickname email').exec(function(err,user){
            if(err) {
                return deferred.reject(err)
            };
            if(!user){
                return deferred.resolve(new Error("User não encontrado"));
            }
            deferred.resolve(user)
        });
        return deferred.promise;
    }


     function addNewProblem(req, res){
         searchUser(req.body.userid)
            .then(function(user){
                var problem = new Problem({
                    title: req.body.title,
                    description: req.body.description,
                    artifacts: req.body.artifacts,
                    owner: {
                        fullname: user.fullname,
                        nickname: user.nickname,
                        email: user.email
                    }
                });
                problem.save(function (err) {
                    if(err){
                        console.log(err);
                        return;
                    }
                    res.json({
                        success: true,
                        mensage: "New Problem created",
                        problem: problem
                    })
                })
            }).catch(function (erro) {
                res.status(400)
                    .json({
                        message: erro.message
                    })
            });

    }

    function getAllProblemsCollaborator(req, res){
       Problem.find({"collaborators.email":req.query.email })
           .where('status' ).equals('active')
           .exec (function (err,problems) {
            if(err){
                res.send(err);
                return;
            }
            if(!problems){
                res.send({
                    success: false,
                    message: "Cadastre seus problemas."
                });
            }else{
                res.send({
                    success: true,
                    problems: problems
                });
            }
        });
    }

    function getAllProblems(req, res){
         Problem.find({})
            .where('owner.email').equals(req.query.email)
             .where('status' ).equals('active')
            .exec (function (err,problems) {
            if(err){
                res.send(err);
                return;
            }
            if(!problems){
                res.send({
                    success: false,
                    message: "Cadastre seus problemas."
                });
            }else{
                res.send({
                    success: true,
                    problems: problems
                });
            }
        });
    }

    function getProblem(req,res){
        Problem.findOne({
            _id: req.query.idproblem
        }).select('_id title description artifacts').exec(function(err,problem){
            if(err) throw err;

            if(!problem){
                res.send({
                    success: false,
                    mensage: "Not Problem"
                });
            }else{
                res.json({
                    success: true,
                    problem: problem
                });
            }
        });

    }


    function getProblemReport(req,res){
        findProblem(req.query.idproblem)
            .then(function(problem){
                res.json({
                        success: true,
                        problem: problem
                    }
                );
            }).catch(function (erro) {
                res.status(400)
                    .json({
                        message: erro.message
                    })
            });

    }


    function tratarResultado(sucesso, erro) {
        return function (err, dado) {
            if (err) {
                return erro(err);
            }
            sucesso(dado);
        }
    }

    function searchOnion(id){
        var deferred = Q.defer();
        Problem.findOne({
            _id: id
        }).select('stakeholders').exec(function (err, problem){
            if(err) {
                return deferred.reject(err)
            };
            if(!problem){
                return deferred.reject(new Error("Problem n�o encontrado"));
            }
            deferred.resolve(problem)
        });
        return deferred.promise;
    }

    function searchOnion3Layer(id){
        var deferred = Q.defer();
        Problem.findOne({
            _id: id
        }).select('postits').exec(function (err, problem){
            if(err) {
                return deferred.reject(err)
            };
            if(!problem){
                return deferred.reject(new Error("Problem nao encontrado"));
            }
            deferred.resolve(problem)
        });
        return deferred.promise;
    }

    function findOnion(req, res){
        searchOnion(req.query.idproblem)
            .then(function (problem) {
                res.json({
                        success:true,
                        stakeholders: problem.stakeholders
                    }
                );
            }).catch(function (erro) {
                res.status(400)
                    .json({
                        message: erro.message
                    })
            });
    }

    function findOnion3layer(req, res){
        searchOnion3Layer(req.query.idproblem)
            .then(function (problem) {
                res.json({
                        success:true,
                        postits: problem.postits
                    }
                );
            }).catch(function (erro) {
            res.status(400)
                .json({
                    message: erro.message
                })
        });
    }

    function findEvaluationFraming(req, res){
        searchOnion(req.query.idproblem)
            .then(function (problem) {
                var data = [
                    {
                        onionlayer: "Community",
                        stakeholders:[],
                    },
                    {
                        onionlayer: "Market",
                        stakeholders:[],
                    },
                    {
                        onionlayer: "Source",
                        stakeholders:[],
                    },
                    {
                        onionlayer: "Contribution",
                        stakeholders:[],
                    },
                    {
                        onionlayer: "Operation",
                        stakeholders:[],
                    }
                ];
                 for (var i = 0; i < problem.stakeholders.length; i++) {
                   for (var j = 0; j < data.length; j++) {
                             if (data[j].onionlayer == problem.stakeholders[i].onionlayer) {
                             var stakeholder = {
                                        _id: problem.stakeholders[i]._id,
                                        name: problem.stakeholders[i].name,
                                        onionlayer: data[j].onionlayer,
                                        description: problem.stakeholders[i].description,
                                        values: problem.stakeholders[i].values,
                                        showValues: false,
                                        showDescription: false,
                                        problems: problem.stakeholders[i].evaluationframing.problems,
                                        solutions: problem.stakeholders[i].evaluationframing.solutions
                                    }
                                data[j].stakeholders.push(stakeholder);
                                 break;
                            }
                        }
                  }
                res.json({
                    success: true,
                    evaluationframework: data
                    })

            }).catch(function (erro) {
                res.status(400)
                    .json({
                        message: erro.message
                    })
            });
    }

    function findProblem(idproblem){
        var deferred = Q.defer();
        Problem.findOne({
            _id: id
        }).exec(function (err, problem){
            if(err) {
                return deferred.reject(err)
            };
            if(!problem){
                return deferred.reject(new Error("Problem n�o encontrado"));
            }
            deferred.resolve(problem)
        });
        return deferred.promise;
    }

    function removeProblem(req,res){
        findProblem(req.query.idproblem)
            .then(function(problem){
                problem.update({$set: { status: "inactive" }}, function(err) {
                    if( err ){
                        console.log(err);
                        return;
                    }
                    res.json({
                            success:true,
                        }
                    );
                });
            }).catch(function (erro) {
                res.status(400)
                    .json({
                        message: erro.message
                    })
            });

    }

    function findProblem(id,email) {
        var deferred = Q.defer();
        Problem.findOne({
            _id: id
        }).exec(function (err, problem){
            if(err) {
                return deferred.reject(err)
            };
            if(!problem){
                return deferred.reject(new Error("Problem nao encontrado"));
            }
            if(buscaUser(problem.collaborators,email)){
                return deferred.reject(new Error("User is Colaborator."));
            }
            deferred.resolve(problem)
        });
        return deferred.promise;
    }

    function findUser(email) {
        var deferred = Q.defer();
        User.findOne({
            email: email
        }).exec(function (err, user){
            if(err) {
                return deferred.reject(err)
            };
            if(!user){
                var newUser = {
                    nickname: 'not User',
                    email: email
                }
                return deferred.resolve(newUser);
            }
            deferred.resolve(user)
        });
        return deferred.promise;
    }

    function addCollaboratorInProblem(result) {
        var deferred = Q.defer();
        result.problem.collaborators.push(result.user);
        result.problem.save(tratarResultado(deferred.resolve, deferred.reject));
        return deferred.promise;
    }
    function buscaUser(listauser, email) {
        for(var i=0; i < listauser.length; i++){
            if(listauser[i].email == email){
                return true;
            }
        }
        return false;
    }

    function addCollaborator(req, res) {
        findProblem(req.body.idproblem,req.body.email)
            .then(function (problem) {
                return findUser(req.body.email)
                    .then(function (user) {
                        return {problem: problem, user: user};
                    })
            }).then(addCollaboratorInProblem)
             .then(function (problem) {
                  var mailOptions = {
                    from: configMail.email, // sender address
                    to: req.body.email, // list of receivers
                    subject: 'Convite para Projeto ' + problem.title, // Subject line
                    text: 'Você foi convidado para contribuir no entendimento do problema ' + problem.title + '.' +
                    '(Informações: Problema proposto por: ' + problem.owner.fullname + ' (' + problem.owner.nickname + '). Email para contato: ' + problem.owner.email + '.) ' +
                    'Acesse http://'+ configMail.serverURL +':3000/'
                };
                sendMail(mailOptions);
                res.json({
                    success:true,
                    collaborators: problem.collaborators
                }
                );
            }).catch(function (erro) {
                res.status(400)
                    .json({
                        message: erro.message
                    })
            });
    }

    function selectCollaborator(list, email){
            var collaborator;
            for (var i = 0; i < list.length; i++) {
                if (list[i].email == email) {
                    collaborator = list[i];
                    return collaborator;
                }
        }
        return null;
    }



    function removeCollaborator(req, res){
        Problem.findOne({
            _id: req.query.idproblem
        }).exec(function (err, problem){
            if(err) {
                res.json({
                    success:false,
                    message: erro.message
                })
            };
            if(!problem){
                res.json({
                    success:false,
                    message: "Problema nao encontrado."
                })
                }else{
                    var collaborator = selectCollaborator(problem.collaborators, req.query.email);
                    if(collaborator) {
                        problem.collaborators.pull(collaborator);
                        problem.save(function (err) {
                            console.log(err);
                            return

                        });
                        res.json({
                            success: true,
                            message: "Removido: " + req.query.email,
                            collaborators: problem.collaborators
                        })
                    }else {
                        res.json({
                            success: false,
                            message: req.query.email + "nao removido."

                        })
                    }

                }
            });
    }


    function searchProblem(idproblem){
        var deferred = Q.defer();
        Problem.findOne({ _id: idproblem }).exec(function(err,problem){
            if(err) {
                return deferred.reject(err)
            };
            if(!problem){
                return deferred.resolve(new Error("Problem nao encontrado"));
            }
            deferred.resolve(problem)
        });
        return deferred.promise;
    };

    function getHistoryChat(req,res){
        var idproblem = req.query.idproblem;
        searchProblem(idproblem)
            .then(function(problem) {
                     res.json({
                            success: true,
                            historychat: problem.chat
                        })
            }).catch(function (err) {
                res.json({
                    success: false,
                    message: "No History Chat"

                })
            });
    }

    //Utilizar para fazer alterações no problema.
    function getAllProblemsAjuste(req,res) {

        console.log(req.body.email + '  ' + req.body.timestamp);

        res.json({
            ok: "okkkkk"
        });
       /* Problem.find({})
            .exec (function (err, problems) {
                if (err) {
                    res.send(err);
                    return;
                }
                if (!problems) {
                    res.send({
                        success: false,
                        message: "Cadastre seus problemas."
                    });
                } else {


                    problems.forEach(function(problem) {
                       for(var i = 0; i < problem.stakeholders.length; i++){
                           if(problem.stakeholders[i].onionlayer  === "Technico"){
                               console.log(i);
                               problem.stakeholders[i].onionlayer = "Operation";
                           }
                       }
                       problem.save(function (err) {
                            console.log(err);
                            return
                        })

                    });


                    res.send({
                        success: true,
                        problems: problems
                    });
                }
            });*/
    }

}