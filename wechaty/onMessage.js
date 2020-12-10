/**
 * @Author: Tingle
 * @Date: 2020/12/9 11:29
 * @LastEditors: Tingle
 * @LastEditTime: 2020/12/9 11:29
 * @Description: onMessage
 */
const { Message } = require("wechaty");
// node-request请求模块包
const request = require("request");
// 请求参数解码
const urlencode = require("urlencode");
// 配置文件
const config = require("../config");
//socket io
const io = require('../socketio');
// 机器人名字
const name = config.name;
// 管理群组列表
const roomList = config.room.roomList;

// itpkAI机器人api配置信息
const itpkApiKey = config.thirdApi.itpk.apiKey;
const itpkApiSecret = config.thirdApi.itpk.apiSecret;
const tianqiAppId = config.thirdApi.tianqiapi.appId;
const tianqiAppSecret = config.thirdApi.tianqiapi.appSecret;

//json校验模块
const validator = require('validator');
const common = require('../common');

// 消息监听回调
module.exports = bot => {
    return async function onMessage(msg) {
        // 判断消息来自自己，直接return
        if (msg.self()) return;

        console.log("=============================");
        // console.log(`message: ${JSON.stringify(msg)}`); //此示例可以看到消息体详情
        console.log(`msg : ${msg}`);
        console.log(
            `from: ${msg.from() ? msg.from().name() : null}: ${
                msg.from() ? msg.from().id : null
                }`
        );
        console.log(`to: ${msg.to()}`);
        console.log(`text: ${msg.text()}`);
        console.log(`isRoom: ${msg.room()}`);
        if(msg.room()){
            console.log(`roomId: ${msg.room().id}`);
        }
        console.log("=============================");

        // 判断此消息类型是否为文本
        if (msg.type() == Message.Type.Text) {
            // 判断消息类型来自群聊
            if (msg.room()) {
                // 获取群聊
                const room = await msg.room();
                io.sendWechatMsg('【' + room.payload.topic + '】@' + msg.from().name() + '：' + msg.text());
                if(config.room.autoReturnRoomList.length > 0 && !config.room.autoReturnRoomList.includes(room.payload.topic)) return;//判断该群是否在阻断名单,如果是空数组，则不阻断
                // 收到消息，提到自己
                if (await msg.mentionSelf()) {
                    // 获取提到自己的名字
                    // let self = await msg.to();//该函数返回null
                    // self = "@" + self.name();
                    let self = "@" + config.name;
                    // 获取消息内容，拿到整个消息文本，去掉 @+名字
                    let sendText = msg.text().replace(self, "");

                    // 请求机器人接口回复
                    let res = await requestRobot(sendText);

                    // 返回消息，并@来自人
                    room.say(res, msg.from());
                    return;
                }

                // 收到消息，没有提到自己  忽略
            } else {
                // 回复信息是关键字 “加群”
                io.sendWechatMsg('@' + msg.from().name() + '：' + msg.text());
                if(config.personal.robotBlockList.includes(msg.from().id)) return;//判断该好友是否在阻断名单
                if(!config.personal.robotQunBlockList.includes(msg.from().id)){//判断该好友是否在群阻断名单
                    if (await isAddRoom(msg)) return;

                    // 回复信息是所管理的群聊名
                    if (await isRoomName(bot, msg)) return;
                }

                // 请求机器人聊天接口
                let res = await requestRobot(msg.text());
                // 返回聊天接口内容
                await msg.say(res)
            }
        } else {
            console.log("消息不是文本！");
            io.sendWechatMsg('收到非文本消息');
        }
    }
};

/**
 * @description 回复信息是关键字 “加群” 处理函数
 * @param {Object} msg 消息对象
 * @return {Promise} true-是 false-不是
 */
async function isAddRoom(msg) {
    // 关键字 加群 处理
    if (msg.text() == "wo要加群123") {
        let roomListName = Object.keys(roomList);
        let info = `${name}当前管理群聊有${roomListName.length}个，回复群聊名即可加入哦\n\n`;
        roomListName.map(v => {
            info += "【" + v + "】" + "\n"
        });
        msg.say(info);
        return true
    }
    return false
}

/**
 * @description 回复信息是所管理的群聊名 处理函数
 * @param {Object} bot 实例对象
 * @param {Object} msg 消息对象
 * @return {Promise} true-是群聊 false-不是群聊
 */
async function isRoomName(bot, msg) {
    // 回复信息为管理的群聊名
    if (Object.keys(roomList).some(v => v == msg.text())) {
        // 通过群聊id获取到该群聊实例
        const room = await bot.Room.find({ id: roomList[msg.text()] });

        // 判断是否在房间中 在-提示并结束
        if (await room.has(msg.from())) {
            await msg.say("您已经在房间中了");
            return true
        }

        // 发送群邀请
        await room.add(msg.from())
        await msg.say("已发送群邀请");
        return true
    }
    return false
}

/**
 * @description 机器人请求接口 处理函数
 * @param {String} info 发送文字
 * @return {Promise} 相应内容
 */
function requestRobot(info) {
    info = info.trim();
    return new Promise((resolve, reject) => {
        let url = `http://i.itpk.cn/api.php?type=json&question=${urlencode(info)}&api_key=${itpkApiKey}&api_secret=${itpkApiSecret}`;
        if (info.endsWith("天气")) {
            info = info.replace("天气", "");
            url = `https://tianqiapi.com/api?version=v6&city=${urlencode(info)}&appid=${tianqiAppId}&appsecret=${tianqiAppSecret}`; //https://tianqiapi.com/api?version=v6&appid=94481879&appsecret=kYt0kSZ8   官网demo竟然给了个能用的appid和appsecret
            request(url, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    if (body) {
                        if (!common.isJSON(body)) {
                            resolve('今天的天气...555');
                        } else {
                            let res = JSON.parse(body);
                            if(res.errcode){
                                resolve('今天的天气...555...555');
                            }else {
                                let send = "【日期】：" + res.date + "（" + res.week + "）\n" +
                                    "【最近更新时间】：" + res.update_time + "\n" +
                                    "【国家】：" + res.country + "（" + res.countryEn + "）\n" +
                                    "【城市】：" + res.city + "（" + res.cityEn + "）\n" +
                                    "【天气】：" + res.wea + "\n" +
                                    "【体感温度】：" + res.tem + "℃\n" +
                                    "【温度范围】：" + res.tem2 + "℃~" + res.tem1 + "℃\n" +
                                    "【风向】：" + res.win + "\n" +
                                    "【风力】：" + res.win_speed + "\n" +
                                    "【湿度】：" + res.humidity + "\n" +
                                    "【能见度】：" + res.visibility + "\n" +
                                    "【气压】：" + res.pressure + "hPa\n" +
                                    "【空气质量】：" + res.air + "\n" +
                                    "【pm2.5】：" + res.air_pm25 + "\n" +
                                    "【温馨提示】：" + res.air_tips + "\n";
                                resolve(send);
                            }
                        }
                    }else {
                        resolve('再等等吧，今天的天气预报好像...还在路上呢');
                    }
                }else {
                    resolve('今天的天气预报好像...还在路上呢');
                }
            });
        } else{
            request(url, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    if (body) {
                        if (body.startsWith('﻿')) {//此处返回的json数据有些问题，额外处理
                            body = body.replace('﻿', '')
                        }

                        if (!common.isJSON(body)) {
                            resolve(body);
                        } else {
                            let res = JSON.parse(body);
                            let send;
                            if (res.type) {
                                send = '【' + res.type + '】\n \n签号：' + res.number1 + '\n \n';
                                switch (res.type) {
                                    case '观音灵签':
                                        send = send + '好坏：' + res.haohua
                                            + '\n\n' + '签语：' + res.qianyu + '\n'
                                            + '\n' + '诗意：' + res.shiyi + '\n'
                                            + '\n' + '白话：' + res.jieqian + '\n';
                                        break;
                                    case '月老灵签':
                                        send = send + '好坏：' + res.haohua
                                            + '\n\n' + '诗意：' + res.shiyi + '\n'
                                            + '\n' + '解签：' + res.jieqian + '\n'
                                            + '\n' + '注释：' + res.zhushi + '\n'
                                            + '\n' + '白话：' + res.baihua + '\n';
                                        break;
                                    case '财神爷灵签':
                                        send = send + '签语：' + res.qianyu
                                            + '\n\n' + '注释：' + res.zhushi + '\n'
                                            + '\n' + '解签：' + res.jieqian + '\n'
                                            + '\n' + '解说：' + res.jieshuo + '\n'
                                            + '\n' + '结果：' + res.jieguo + '\n'
                                            + '\n' + '婚姻：' + res.hunyin + '\n'
                                            + '\n' + '事业：' + res.shiye + '\n'
                                            + '\n' + '功名：' + res.gongming + '\n'
                                            + '\n' + '失物：' + res.shiwu + '\n'
                                            + '\n' + '出外移居：' + res.cwyj + '\n'
                                            + '\n' + '六甲：' + res.liujia + '\n'
                                            + '\n' + '求财：' + res.qiucai + '\n'
                                            + '\n' + '交易：' + res.jiaoyi + '\n'
                                            + '\n' + '疾病：' + res.jibin + '\n'
                                            + '\n' + '诉讼：' + res.susong + '\n'
                                            + '\n' + '运途：' + res.yuntu + '\n'
                                            + '\n' + '某事：' + res.moushi + '\n'
                                            + '\n' + '合伙做生意：' + res.hhzsy + '\n';
                                        break;
                                    default:
                                }
                            } else if (res.title) {
                                send = '【' + res.title + '】\n \n \n' + res.content;
                            } else {
                                send = "天呐~~我竟然...";
                            }
                            resolve(send);
                        }
                    } else {
                        resolve("我..我..我甚至不知道你在说什么...")
                    }
                } else {
                    resolve("你在说什么，我脑子有点短路诶！")
                }
            })
        }
    })
}