/**
 * Created by JOSEVALDERLEI on 22/06/2015.
 */


/*module.exports = function(io,socket) {
    socket.on('atualizarProblema', function(problem) {
        if(problem.id == '001') {
            io.emit('onAtualizarProblema', problem)
        }
    })
};*/

module.exports = function(io,socket) {

    socket.on('addProblemID', function(idProblem){
        socket.room = idProblem;
        socket.join(idProblem);
        console.log("Pronto para editar problema com id " + idProblem);
    });

    socket.on('disconnectProblem', function(){
        delete usernames[socket.username];
        io.emit('updateusers', usernames);
        socket.leave(socket.room);
    });

    socket.on('atualizarProblema', function (data) {
        data.idProblem = socket.room;
        console.log("Editanto Problema: " + socket.room + ": " + data.description);
        io.sockets.in(socket.room).emit('onAtualizarProblema', data);
    });

     /*socket.on('atualizarProblema', function(problem) {
     if(problem.id == '001') {
     io.emit('onAtualizarProblema', problem)
     }
  })*/

};

