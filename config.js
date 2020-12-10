/**
 * @Author: Tingle
 * @Date: 2020/12/9 10:25
 * @LastEditors: Tingle
 * @LastEditTime: 2020/12/9 10:25
 * @Description: config
 */

module.exports = {
    // puppet_donu Token
    token: "PUT_YOUR_TOKEN_HERE",
    // 机器人名字
    name: "Oreo",
    // 房间/群聊
    room: {
        // 管理群组列表
        roomList: {
            // 群名(用于展示，建议用群名) : 群id(先运行程序，获取群id（roomId）)
            有钱小组: "xxxx1@chatroom",
            Web开发组: "xxxx2@chatroom"
        },
        // 加入房间回复
        roomJoinReply: `\n 您好，进群请先看群公告！自觉遵守群规则，文明交流！最后，请用简短的话向大家介绍你自己！😊 \n\n Hello, please read the group announcement first! Consciously abide by the group rules, civilized communication! Finally, please introduce yourself in short words! 😊`,
        autoReturnRoomList: ['大家有钱花', 'wechaty开发组']
    },
    // 私人
    personal: {
        // 好友验证自动通过关键字
        addFriendKeywords: ["12345", "一二三四五", "上山打老虎"],
        // 是否开启加群
        addRoom: true,
        robotBlockList: ['tengxun', 'tengxun1'],
        robotQunBlockList: ['tengxun', 'tengxun2']
    },
    //三方api信息
    thirdApi: {
        // http://www.itpk.cn/
        itpk: {
            apiKey: "xxx",
            apiSecret: "xxx"
        },
        // http://www.tianqiapi.com/
        tianqiapi: {
            appId: "zzz",
            appSecret: "zzz"
        }
    }
};