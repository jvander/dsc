/**
 * Created by JOSEVALDERLEI on 15/07/2015.
 */

(function(){

'use strict';

angular
    .module('app')
    .controller('chatDSC',chatDSC);

    function chatDSC($timeout, $filter, toastApp, Socket, problemService, $window) {

        var self = this;
        self.newmsg = "";
        self.messages = [];
        self.replay = false;
        self.nickname = "";
        self.usersOnLine = [];
        self.initHistoryChat = initHistoryChat;
        self.showReplay = showReplay;
        self.sendMessage = sendMessage;
        self.photo = "";
        self.openChat = openChat;
        self.isOpenChat = false;
        self.keypressChat = keypressChat;
        self.contador = 0;
        self.showUsersOnLine = showUsersOnLine;
        self.showUser = false;
        self.keypressChatReturn = keypressChatReturn;
        self.returnChat = returnChat;
        function returnChat(msg) {
            msg.isReturnMsg = !msg.isReturnMsg;
        }

        function showUsersOnLine(){
            if(self.usersOnLine.length > 1){
                self.showUser = !self.showUser;
            }
        };

        function openChat(){
            self.isOpenChat = !self.isOpenChat;
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
                                isReturnMsg: false,
                                msg: data.historychat[i].msg,
                                time: tmp.getDate() + "/" + (tmp.getMonth() + 1 )+ "/" + tmp.getFullYear() + " [" + tmp.getHours() + ":" + tmp.getMinutes() + "] "
                            };
                            self.messages.push(msn);
                        }
                    }
                });
        }

        Socket.on('onUserON', function (nickname) {
                if(nickname !== self.nickname){
                    setUsersList(nickname);
                }
        });

        function setUsersList(nickname){
            for(var i=0; i < self.usersOnLine.length; i++){
                if(self.usersOnLine[i] === nickname) return;
            }
            self.usersOnLine.push(nickname);
            self.usersOnLine.sort();
        }

        Socket.on('onNotifyON', function (obj) {
            if(self.nickname !== obj.nickname) {
                toastApp.errorMessageBottom(obj.nickname + ", " + $filter('translate')(obj.msg));
                setUsersList(obj.nickname);
                Socket.emit('userON', self.nickname);
                return;
            }
            self.usersOnLine = [];
            self.usersOnLine.push(self.nickname);
        });

        Socket.on('onNotifyOFF', function (obj) {
            if(obj.nickname !== self.nickname) {
                toastApp.errorMessageBottom(obj.nickname + ", " + $filter('translate')(obj.msg));
            }
            for (var i = 0; i < self.usersOnLine.length; i++) {
                if (obj.nickname === self.usersOnLine[i]) {
                    self.usersOnLine.splice(i, 1);
                }
            }
        });

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


        function sendMessage(chatmsg){
            console.log(chatmsg);
            if(chatmsg === undefined || chatmsg.length < 2 ){
                document.getElementById('fieldNewMessage').focus();
                return;
            }
            Socket.emit('broadcastChat', chatmsg);
            self.newmsg = "";
            self.contador = 0;
        }

        function zerarContador(){
            self.contador = 0;
        }

        function keypressChatReturn(event,msg){
            var newMsg =
               "(" + msg.nickname + "-" + msg.time + ": " + msg.msg + ") " + msg.newMsg;
            if(event.keyCode == 13){
                self.contador++;
                if (self.contador == 1) {
                    $timeout(zerarContador, 1000);
                }
                if(self.contador > 1){
                    msg.isReturnMsg = false;
                    sendMessage(newMsg);
                    msg.newMsg = "";
                }
            }
        }
        
        function keypressChat(event,chatmsg){
            if(event.keyCode == 13){
                self.contador++;
                if (self.contador == 1) {
                    $timeout(zerarContador, 1000);
                }
                if(self.contador > 1){
                    sendMessage(chatmsg);
                }
            }
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
