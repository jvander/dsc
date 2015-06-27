/**
 * Created by JOSEVALDERLEI on 22/06/2015.
 */


module.exports = function(io,socket) {
    socket.on('atualizarProblema', function(problem) {
        if(problem.id == '001') {
            io.emit('onAtualizarProblema', problem)
        }
    })
};

