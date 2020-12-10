/**
 * @Author: Tingle
 * @Date: 2020/12/8 21:25
 * @LastEditors: Tingle
 * @LastEditTime: 2020/12/9 21:25
 * @Description: donut
 */

const { FileBox } = require("wechaty");

var puppet_donut = {};

//获取bot（机器人）
var bot = null;

//发送文本消息给联系人
puppet_donut.sendTextMsgToContact = async function(friendName, text){
    const contact = await bot.Contact.find({name: friendName});  //根据昵称搜索好友 change 'lijiarui' to any of your contact name in wechat
    if(!contact) return; //好友不存在直接返回
    await contact.say(text); //调用contact对象的say方法发送消息，contact对象很多方法，参考官方文档
};

//发送媒体消息给联系人
puppet_donut.sendMediaMsgToContact = async function(friendName, fileUrl, filePath){
    const contact = await bot.Contact.find({name: friendName});  // change 'lijiarui' to any of your contact name in wechat
    if(!contact) return;
    if(fileUrl){
        const fileBox1 = FileBox.fromUrl(fileUrl);
        await contact.say(fileBox1)
    }
    if(filePath){
        const fileBox2 = FileBox.fromFile(filePath);
        await contact.say(fileBox2)
    }
};

//发送名片消息给联系人
puppet_donut.sendContactCardMsgToContact = async function(friendName, contactId){
    const contact = await bot.Contact.find({name: friendName});  // change 'lijiarui' to any of your contact name in wechat
    if(!contact) return;
    const contactCard = bot.Contact.load(contactId);
    await contact.say(contactCard);
};

//发送链接消息给联系人
puppet_donut.sendUrlLinkMsgToContact = async function(friendName, description, thumbnailUrl, title, url){
    const contact = await bot.Contact.find({name: friendName});  // change 'lijiarui' to any of your contact name in wechat
    if(!contact) return;
    const urlLink = new UrlLink ({
        description : description,
        thumbnailUrl: thumbnailUrl,
        title       : title,
        url         : url,
    });
    await contact.say(urlLink);
};

//发送小程序消息给联系人
puppet_donut.sendMiniProgramMsgToContact = async function(friendName, username, appid, title, pagepath, description, thumbnailurl){
    const contact = await bot.Contact.find({name: friendName});  // change 'lijiarui' to any of your contact name in wechat
    if(!contact) return;
    const miniProgram = new MiniProgram ({
        username           : username,     //get from mp.weixin.qq.com
        appid              : appid,        //optional, get from mp.weixin.qq.com
        title              : title,        //optional
        pagepath           : pagepath,     //optional
        description        : description,  //optional
        thumbnailurl       : thumbnailurl, //optional
    });
    await contact.say(miniProgram)
};

//初始化调用
puppet_donut.run = function(){

    const { Wechaty } = require('wechaty');
    const { ScanStatus } = require('wechaty-puppet');
    const QrcodeTerminal = require('qrcode-terminal');
    const io = require('./socketio');
    const config = require("./config");

    const onRoomJoin = require("./wechaty/onRoomJoin");     // 加入房间监听回调
    const onRoomLeave = require("./wechaty/onRoomLeave");   // 退出房间监听回调
    const onMessage = require("./wechaty/onMessage");       // 消息监听回调
    const onFriendShip = require("./wechaty/onFriendShip"); // 好友添加监听回调

    const token = config.token;

    bot = new Wechaty({
        puppet: 'wechaty-puppet-hostie',
        puppetOptions: {
            token,
        },
        name: config.name
    });

    bot
        .on('scan', (qrcode, status) => {
            if (status === ScanStatus.Waiting) {
                QrcodeTerminal.generate(qrcode, {
                    small: true
                });
                io.sendWechatMsg("请扫描二维码进行登录>>>>>>>>>>>>>>>>>>>");
            }
        })
        .on('login', async user => {
            console.log(`user: ${JSON.stringify(user)}`);
            io.sendWechatMsg("登录成功>>>>>>>>>>>>>>>>>>>");
            var loginInfo = {
                nick: config.name,
                avatar: user.payload.avatar
            };
            io.sendWechatLoginMsg(loginInfo);
        })
/*        .on('message', async message => {
            console.log(`message: ${JSON.stringify(message)}`);
            io.sendWechatMsg(JSON.stringify(message));
        })*/
        .on("room-join", onRoomJoin)    // 加入群聊监听
        .on("room-leave", onRoomLeave)  // 退出群聊房间监听
        .on("message", onMessage(bot))  // 消息监听
        .on("friendship", onFriendShip) // 好友添加监听
        .start();
};

module.exports = puppet_donut;