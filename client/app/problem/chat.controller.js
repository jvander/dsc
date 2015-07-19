/**
 * Created by JOSEVALDERLEI on 15/07/2015.
 */
'use strict';

angular
    .module('app')
    .controller('chatDSC',chatDSC);

    function chatDSC($timeout, Socket, $mdSidenav, $log,problemService,$window) {
        var vm = this;
        vm.newmsg = "";
        vm.messages = [];
        vm.replay = false;
        vm.nickname = "",
        vm.close = function () {
            $mdSidenav('chat').close()
                .then(function () {
                    $log.debug("close chat");
                });
        };

        vm.initHistoryChat = function(){
            vm.idProblem = $window.localStorage.getItem('problemid');
            vm.nickname = $window.localStorage.getItem('nickname');
            problemService.gethistorychat(vm.idProblem)
                .success(function(data) {
                    if(data.success) {
                        console.log(data.historychat);
                        for (var i = 0; i < data.historychat.length; i++) {
                            var tmp = new Date(data.historychat[i].time);
                            var msn = {
                                nickname: data.historychat[i].nickname,
                                msg: data.historychat[i].msg,
                                time: tmp.getDate() + "/" + (tmp.getMonth() + 1 )+ "/" + tmp.getFullYear() + " [" + tmp.getHours() + ":" + tmp.getMinutes() + "] "
                            }
                            vm.messages.push(msn);
                        }
                    }
                })
        }

        vm.showReplay = function(){
            if(vm.replay){
                vm.replay = false;
            }else{
                vm.replay = true;
            }

        }
        Socket.on('onBroadcastChat', function (obj) {
                var tmp = new Date(obj[obj.length -1].time);
                vm.messages.push({
                    nickname: obj[obj.length -1].nickname,
                    msg: obj[obj.length -1].msg,
                    time: tmp.getDate() + "/" + (tmp.getMonth() + 1) + "/" + tmp.getFullYear() + " [" + tmp.getHours() + ":" + tmp.getMinutes() + "] "
                });
        });

        vm.sendMessage = function(chatmsg){
             Socket.emit('broadcastChat', chatmsg);
            vm.newmsg = "";
        }

    };

