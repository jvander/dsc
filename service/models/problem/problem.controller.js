/**
 * Created by JOSEVALDERLEI on 07/07/2015.
 */
var router = require('express').Router();
var Problem = require('../../models/problem/problem');
var User = require('../../models/user');

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
        .post(addCollaborator)

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
        console.log(req.query.idproblem)

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

    function addCollaborator(req,res){
        var collaborator = "";
        Problem.findOne({
            _id: req.body.idproblem
        }).exec(function(err,problem){
            if(err) throw err;
            if(!problem){
                res.json({
                        success: false,
                        message: "Error " + problem
                    }
                );
            }else {



                console.log(searchUser(req.body.email));


               /* var mailOptions = {
                    from: configMail.email, // sender address
                    to: req.body.email, // list of receivers
                    subject: 'Addd Project DSC', // Subject line
                    text: 'Olá,! Você foi selecionado para nos ajudar a entender melhor o problema ' + problem.title + '.' +
                    'Acesse http://'+ configMail.serverURL +':3000/'
                };

                sendMail(mailOptions);*/

                //problem.collaborators.push(colaborator);
               /* problem.save(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.json({
                        success: true,
                        message: "Add email " + req.body.email
                    })
                })*/
            }
        });


    }

    function searchUser(email){
        var collaborator = "";
        User.findOne({
            email: email
        }).select('nickname email').exec(function(err,user){
            if(err) throw err;
            if(!user){
                collaborator = {
                    id : "",
                    nickname : "nao cadastrado.",
                    email: email
                };
            }else{
                console.log(user);
                return user;
            }
        });
    }

}