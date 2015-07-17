/**
 * Created by JOSEVALDERLEI on 15/07/2015.
 */

angular
    .module('app')
    .controller('chatDSC',chatDSC);

    function chatDSC($timeout, Socket, $mdSidenav, $log) {
        vm = this;
        vm.newmsg = "";
        vm.messages = [];
        vm.close = function () {
            $mdSidenav('chat').close()
                .then(function () {
                    $log.debug("close chat");
                });
        };
        Socket.on('onBroadcastChat', function (obj) {
            if(vm.messages.length == 0) {
                for (var i = 0; i < obj.length; i++) {
                    tmp = new Date(obj[i].time);
                    var msn = {
                        nickname: obj[i].nickname,
                        msg: obj[i].msg,
                        time: tmp.getDate() + "/" + (tmp.getMonth() + 1 )+ "/" + tmp.getFullYear() + " [" + tmp.getHours() + ":" + tmp.getMinutes() + "] "
                    }
                    vm.messages.push(msn);
                }
            }else{
                tmp = new Date(obj[obj.length -1].time);
                vm.messages.push({
                    nickname: obj[obj.length -1].nickname,
                    msg: obj[obj.length -1].msg,
                    time: tmp.getDate() + "/" + (tmp.getMonth() + 1) + "/" + tmp.getFullYear() + " [" + tmp.getHours() + ":" + tmp.getMinutes() + "] "
                });
            }
        });

        vm.sendMessage = function(chatmsg){
             Socket.emit('broadcastChat', chatmsg);
            vm.newmsg = "";
        }

    };