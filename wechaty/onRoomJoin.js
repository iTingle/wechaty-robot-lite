/**
 * @Author: Tingle
 * @Date: 2020/12/9 11:26
 * @LastEditors: Tingle
 * @LastEditTime: 2020/12/9 11:26
 * @Description: onRoomJoin
 */
// 配置文件
const config = require("../config");
const io = require('../socketio');
// 加入房间回复
const roomJoinReply = config.room.roomJoinReply;
// 管理群组列表
const roomList = config.room.roomList;

// 进入房间监听回调 room-群聊 inviteeList-受邀者名单 inviter-邀请者
module.exports = async function onRoomJoin(room, inviteeList, inviter) {
    // 判断配置项群组id数组中是否存在该群聊id
    if (Object.values(roomList).some(v => v == room.id)) {
        // let roomTopic = await room.topic()
        inviteeList.map(c => {
            // 发送消息并@
            console.log("【邀请者】：" + inviter + " 邀请 " + c + " 入群");
            io.sendWechatMsg("【邀请者】：" + inviter + " 邀请 " + c + " 入群");
            room.say(roomJoinReply, c)
        })
    }
};