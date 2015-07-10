/**
 * Created by JOSEVALDERLEI on 07/07/2015.
 */
var router = require('express').Router();
var Problem = require('../../models/problem/problem');
var User = require('../../models/user');
var Q = require('q');

function sendMail(mailOptions){
    require('../../sendmailDSC')(mailOptions);
}

module.exports = function () {

    router.route('/newproblem/')
        .post(addNewProblem);
    router.route('/getproblem/')
        .get(getProblem);
    router.route('/getproblems/')
        .get(getAllProblems);
    router.route('/addpeople/')
        .post(addColaborator)

    return router;

     function addNewProblem(req, res){
         console.log("Gravando problema para o id: " + req.body.userid)

        var problem = new Problem({
            title: req.body.title,
            description: req.body.description,
            owner: req.body.userid
        });
        problem.save(function (err) {
            if(err){
                console.log(err);
                return;
            }
            res.json({
                success: true,
                mensage: "new Problem created",
                problem: problem
            })
        })

    }

    function getAllProblems(req, res){

        Problem.find({owner : req.query.userid }).exec (function (err,problems) {
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
        }).select('_id title description').exec(function(err,problem){
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



    function tratarResultado(sucesso, erro) {
        return function (err, dado) {
            if (err) {
                return erro(err);
            }

            sucesso(dado);
        }
    }

    function findProblem(id) {
        var deferred = Q.defer();

        Problem.findOne({
            _id: id
        }).exec(function (err, problem){
            if(err) {
                return deferred.reject(err)
            };
            if(!problem){
                return deferred.reject(new Error("Problema n�o encontrado"));
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
            }

            if(!user){
                var newUser = {
                    nickname: 'not User',
                    email: email
                };
                return deferred.resolve(newUser);
            }
            deferred.resolve(user)
        });
        return deferred.promise;
    }

    function addColaboratorInProblem(result) {
        var deferred = Q.defer();
        result.problem.collaborators.push(resul.user);
        result.problem.save(tratarResultado(deferred.resolve, deferred.reject));
        return deferred.promise;
    }


    function addColaborator(req, res) {
        findProblem(req.body.idproblem)
            .then(function (problem) {
                return findUser(req.body.email)
                    .then(function (user) {
                        return {problem: problem, user: user};
                    })
            }).then(addColaboratorInProblem)
            .then(function (problem) {
                res.json(problem.colaborators);
            }).catch(function (erro) {
                res.status(400)
                    .json({
                        message: erro.message
                    })
            });
    }

}