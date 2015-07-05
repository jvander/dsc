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

    socket.on('addProblemID', function(problem){
        socket.room = problem.id;
        socket.join(problem.id);
        console.log("Pronto para editar problema com id " + problem.id);
    });

    socket.on('disconnectProblem', function(){
        delete usernames[socket.username];
        io.emit('updateusers', usernames);
        socket.leave(socket.room);
    });

    socket.on('atualizarProblema', function (data) {
        console.log("Permissão: " + data.update);
        if(data.update){
            console.log("Grevando no banco....: " + socket.room );
        }
        data.id = socket.room;
        io.sockets.in(socket.room).emit('onAtualizarProblema', data);
    });



     /*socket.on('atualizarProblema', function(problem) {
     if(problem.id == '001') {
     io.emit('onAtualizarProblema', problem)
     }
  })*/

};

