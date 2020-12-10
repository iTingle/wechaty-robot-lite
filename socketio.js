/**
 * @Author: Tingle
 * @Date: 2020/12/8 21:00
 * @LastEditors: Tingle
 * @LastEditTime: 2020/12/9 21:00
 * @Description: socketio
 */

var socketio = {};
const common = require('./common');

// 获取io

var io = null;

//微信登录消息推送至客户端
socketio.sendWechatLoginMsg = function(msg){
    io.emit('getWechatLoginMsg', + msg);//触发所有用户
};

//回调消息推送至客户端
socketio.sendWechatMsg = function(msg){
    io.emit('getWechatMsg', '【' + common.currentDateTime() + '】' + msg);//触发所有用户
};

//初始化socketio
socketio.getSocketio = function(server){ // http(s) server

    io = require("socket.io")(server);

    //监听连接成功
    io.sockets.on('connection', function (socket) {
        console.log('连接成功');

        //监听事件event01
        socket.on('event01',function(){ // 处理来自客户端的’event01’事件

            console.log('监听点击事件');

            var datas = [1,2,3,4,5];

            socket.emit('event02', {datas: datas}); // 给该客户端发送event02事件

            socket.broadcast.emit('event02', {datas: datas}); // 发送给其它客户端

        });

        //监听事件send
        socket.on("send", data => {  // 监听的频道必须和客户端监听的频道相同，等待消息
            // io.emit("监听频道", "发送的信息");  // 向所有客户端发送信息
            console.log('客户端发送的内容：', data);
            io.emit('getMsg', '我是返回的消息... ...' + common.currentDateTime());//触发所有用户
            // socket.emit('getMsg', '我是返回的消息... ...' + new Date().getTime());//触发当前用户
            // socket.broadcast.emit('getMsg', '我是返回的消息... ...' + new Date().getTime());//触发除去该用户以外的用户
            // io.to(socketedId).emit('getMsg', '我是返回的消息... ...' + new Date().getTime());//触发指定用户
        });

        //监听前台发送微信文本消息，并进行消息发送
        socket.on("sendWechatText", data => {
            console.log('客户端发送的内容：', data);
            var puppet_donut = require('./donut');
            puppet_donut.sendTextMsgToContact(data.friendNick, data.wechatContent);
            io.emit('sendWechatTextCallback', '微信消息发送成功... ...' + common.currentDateTime());//触发所有用户
        });

        // 更多事件，就更多处理函数

        // ......

        socket.on("disconnect", data => {  // 客户端断开链接
            console.log('断开连接：', data);
        });

        socket.on('error', function (err) {   //发生错误时触发
            console.log(err);
        });

        setTimeout( () => {
            socket.emit('getMsg', '我是初始化3s后的返回消息... ...');
        }, 3000)

    })

};

module.exports = socketio;