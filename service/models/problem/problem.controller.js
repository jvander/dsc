/**
 * Created by JOSEVALDERLEI on 07/07/2015.
 */
var router = require('express').Router();
var Problem = require('../../models/problem/problem');

module.exports = function () {

    router.route('/newproblem/')
        .post(addNewProblem)
        .get(getProblem);
    router.route('/getproblems/')
        .get(getAllProblems);

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
            _id: req.query.id
        }).select('_id title description').exec(function(err,problem){
            if(err) throw err;

            if(!problem){
                console.log(problem)
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

}