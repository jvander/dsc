/**
 * Created by JOSEVALDERLEI on 15/07/2015.
 */

(function(){

'use strict';

angular
    .module('app')
    .controller('chatDSC',chatDSC);

    function chatDSC($timeout, Socket, problemService, $window) {

        var self = this;
        self.newmsg = "";
        self.messages = [];
        self.replay = false;
        self.nickname = "";
        self.userList = [];
        self.initHistoryChat = initHistoryChat;
        self.showReplay = showReplay;
        self.sendMessage = sendMessage;
        self.photo = "";
        self.openChat = openChat;
        self.isOpenChat = false;

        function openChat(){
            self.isOpenChat = !self.isOpenChat;
            document.getElementById('message').focus()
        }

        function initHistoryChat(){
            self.idProblem = $window.localStorage.getItem('problemid');
            self.nickname = $window.localStorage.getItem('nickname');
            self.photo = $window.localStorage.getItem('photo');
            problemService.gethistorychat(self.idProblem)
                .success(function(data) {
                    if(data.success) {
                        for (var i = 0; i < data.historychat.length; i++) {
                            var tmp = new Date(data.historychat[i].time);
                            var msn = {
                                nickname: data.historychat[i].nickname,
                                msg: data.historychat[i].msg,
                                time: tmp.getDate() + "/" + (tmp.getMonth() + 1 )+ "/" + tmp.getFullYear() + " [" + tmp.getHours() + ":" + tmp.getMinutes() + "] "
                            };
                            self.messages.push(msn);
                        }
                    }
                });
            Socket.emit('checkUsers');
        }

        function showReplay(){
            if(self.replay){
                self.replay = false;
            }else{
                self.replay = true;
            }
        }

        Socket.on('onBroadcastChat', function (obj) {
            var tmp = new Date(obj[obj.length -1].time);
            self.messages.push({
                nickname: obj[obj.length -1].nickname,
                msg: obj[obj.length -1].msg,
                time: tmp.getDate() + "/" + (tmp.getMonth() + 1) + "/" + tmp.getFullYear() + " [" + tmp.getHours() + ":" + tmp.getMinutes() + "] "
            });
        });

        Socket.on('onCheckUsers', function (userList) {
            self.userList = userList;
        });

        function sendMessage(chatmsg){
            if(chatmsg === undefined || chatmsg.length < 2 ){
                return;
            }
            Socket.emit('broadcastChat', chatmsg);
            self.newmsg = "";
        }

   }

})();






/*
var self = this;
self.newmsg = "";
self.messages = [];
self.replay = false;
self.nickname = "";
self.userList = [];
self.initHistoryChat = initHistoryChat;
self.close = close;
self.showReplay = showReplay;
self.sendMessage = sendMessage;

function close() {
    $mdSidenav('chat').close()
        .then(function () {
            $log.debug("close chat");
        });
}

function initHistoryChat(){
    self.idProblem = $window.localStorage.getItem('problemid');
    self.nickname = $window.localStorage.getItem('nickname');
    self.photo = $window.localStorage.getItem('photo');
    problemService.gethistorychat(self.idProblem)
        .success(function(data) {
            if(data.success) {
                for (var i = 0; i < data.historychat.length; i++) {
                    var tmp = new Date(data.historychat[i].time);
                    var msn = {
                        nickname: data.historychat[i].nickname,
                        msg: data.historychat[i].msg,
                        time: tmp.getDate() + "/" + (tmp.getMonth() + 1 )+ "/" + tmp.getFullYear() + " [" + tmp.getHours() + ":" + tmp.getMinutes() + "] "
                    };
                    self.messages.push(msn);
                }
            }
        });
    Socket.emit('checkUsers');
}

function showReplay(){
    if(self.replay){
        self.replay = false;
    }else{
        self.replay = true;
    }
}

Socket.on('onBroadcastChat', function (obj) {
    var tmp = new Date(obj[obj.length -1].time);
    self.messages.push({
        nickname: obj[obj.length -1].nickname,
        msg: obj[obj.length -1].msg,
        time: tmp.getDate() + "/" + (tmp.getMonth() + 1) + "/" + tmp.getFullYear() + " [" + tmp.getHours() + ":" + tmp.getMinutes() + "] "
    });
});

Socket.on('onCheckUsers', function (userList) {
    self.userList = userList;
});

function sendMessage(chatmsg){
    Socket.emit('broadcastChat', chatmsg);
    self.newmsg = "";
}*/
