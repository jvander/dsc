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
        console.log("Permissão: " + data.update);
        if(data.update){
            console.log("Gravando no banco....: " + socket.room + " user " + socket.username );
        }
        data.id = socket.room;
        io.sockets.in(socket.room).emit('onAtualizarProblema', data);
    });


};

