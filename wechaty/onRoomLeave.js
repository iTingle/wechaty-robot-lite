/**
 * @Author: Tingle
 * @Date: 2020/12/9 16:10
 * @LastEditors: Tingle
 * @LastEditTime: 2020/12/9 16:10
 * @Description: onRoomLeave
 */

const io = require('../socketio');
// 进入房间监听回调 room-群聊 leaver-退群者
module.exports = async function onRoomLeave(room, leaver) {
    console.log("群-【" + room.name + "】：" + leaver + " 退群");
    io.sendWechatMsg("群-【" + room.name + "】：" + leaver + " 退群");
};