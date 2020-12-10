"# wechaty-robot-lite" 

### 前言

最近在dy上看到有相关wx机器人（SCRM）在进行相关推广，而之前学习的时候，用基于python开发的itchat玩过一段时间，后来，某一天突然发现微信登不上了，官方的微信网页版也不能登陆了（至于是啥原因，咱也不知道，也不敢去研究）。

最近又在捣鼓捣鼓这个小助手，遂捡起了之前看过的wechaty。对！！！就是他！！！他来了~~

老规矩，先撩姐（🎨🎨）

### 简介：

*   [官方（git）](https://github.com/wechaty)
*   语言：node(TypeScript )，python，java（项目多是支持node，一些是开源了python和java；看issues说是node项目支持的更完美~~咱也没细究）
*   协议：iPad、Mac、WinPc、Web等等（支持的协议挺多的，当然，web协议的README里会声明，登录不了web版微信的号不能正常使用）
*   使用：这里有个东东要提前声明下：token，wechaty的服务都依赖于token，有个合法的token才能正常使用wechaty的服务；后面会细说
*   免费：参与开源激励计划→[传送门(点它)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty#2%E5%85%8D%E8%B4%B9Token%E5%8F%82%E4%B8%8E%E5%BC%80%E6%BA%90%E6%BF%80%E5%8A%B1%E8%AE%A1%E5%88%92)
*   收费：官方发布是200￥/号/月，具体→[传送门(点它)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty#3%E4%BB%98%E8%B4%B9Token%E7%9B%B4%E6%8E%A5%E5%92%A8%E8%AF%A2%E5%95%86%E5%8A%A1%E8%B4%AD%E4%B9%B0)
*   说明：官方声明，一个token原则上只能同时在线一个微信号，这里的意思就有意味了。这个token不会绑定你的微信号，但是呢，只能同时在线一个微信，你要是想做n个微信的私域，那就需要n个token

### 学习：

*   我这里的项目是基于[wechaty-puppet-hostie](https://github.com/wechaty/wechaty-puppet-hostie)
*   [官方API文档](https://wechaty.js.org/docs/api/)（很重要！！！一定要先看文档再下手，如果要基于这个开发，一定要把它当作手册）
*   [官方参考示例](https://github.com/juzibot/donut-tester#example)（至于我为什么基于这个示例，因为官方给的我15天免费token是donut版，基于windows协议）
*   语言：主要是nodejs，基于express框架→[传送门（点它）](https://www.expressjs.com.cn/)
*   技术栈：express框架（前端ejs），socket io
*   名词解释
    *   token：官方解释

        > *   Our Mission: Make it easy to build a WeChat Chatbot for developers.
        >
        >     We provide a **free** access using [iPad protocol](https://www.lizenghai.com/goto/?url=https://github.com/wechaty/wechaty-puppet-padplus) for the developers who have a strong will and ability to build a valuable chatbot for users.
        >
        >     Any developers can add JuziBOT Inc’s staff ( **Wechat number :** juzibot) as a Wechat friend. You will receive a review form after adding. If you pass the review and willing to write a blog in Wechaty , you can use our iPad protocol for free！
        >
        >     我们的使命：轻松为开发人员构建微信聊天机器人
        >
        >     我们为有强烈意愿和能力为用户构建有价值的聊天机器人的开发人员提供了使用[iPad协议](https://www.lizenghai.com/goto/?url=https://github.com/wechaty/wechaty-puppet-padplus)的**免费**访问权限
        >
        >     任何开发人员都可以将JuziBOT Inc的工作人员（**微信编号：**juzibot）添加为微信好友。添加后，您将收到一份审查表。如果您通过审查并愿意在Wechaty中写博客，则可以免费使用我们的iPad协议！
        >

        *   意思是我们提交审查表后，会获得为期15天的免费Token；想要获取长期有效的免费token，那就参加所谓的开源激励计划，就是在15天后，需要提交一个MVP(最小可行化产品)的Github仓库，Wechaty会将其fork到社区中的同时，会提供一个长期免费Token

    *   [wechaty-puppet-padplus](https://www.lizenghai.com/goto/?url=https://github.com/wechaty/wechaty-puppet-padplus)：基于ipad协议的微信机器人
    *   [wechaty-puppet-hostie](https://github.com/wechaty/wechaty-puppet-hostie)：基于windows协议的机器人

### 初步需求：

*   关键字自动通过好友验证
    *   当有人添加机器人时，判断验证消息关键字后通过或直接通过
    *   通过验证后自动回复并介绍机器人功能
*   私聊关键字回复
    *   例如回复 `加群` 推送群聊邀请
    *   例如回复 `作者微信` 推送作者微信名片
    *   例如回复 白名单`群名` 邀请入群
*   自动聊天
    *   对接AI机器人，这里科普推荐免费机器人api和[免费天气查询api](http://www.tianqiapi.com/)，回复 芜湖天气
    *   群聊中通过 `@[机器人]xxx` 可以和机器人聊天
    *   私聊发送消息即可聊天
    *   向机器人询问天气
*   加入群聊自动欢迎
    *   当新的小伙伴加入群聊后自动 `@[新的小伙伴]` 发一个文字欢迎
*   web聊天
    *   前台获取好友列表
    *   通过socket实时向前台推送还有消息
    *   实现前台向好友发送消息

### 项目结构：

```bash
|--bin/
|----www # 项目启动文件
|--publick/ #静态资源木狼
|----image/
|----javascripts/
|----stylesheets/
|------style.css
|--routes/ # 路由
|----index.js
|----users.js
|--views/  # 模板
|----error.ejs
|----index.ejs
|--wechaty/
|----onFriendShip.js # 好友添加监听回调
|----onMessage.js    # 消息监听回调
|----onRoomJoin.js   # 进入群聊监听回调
|----onRoomLeave.js  # 退出群聊监听回调
|--app.js    # 核心
|--common.js # 公共方法
|--config.js # 配置文件
|--donut.js  # wechaty核心
|--package.js
|--package-lock.js
|--socketio.js # socket核心
```


撸起袖子干，开干
========

项目初始化
-----

**新建文件夹wechaty-lite，进入目录执行cnpm init -y   (大家都知道国内直接使用 npm 的官方镜像是非常慢的，这里推荐使用[淘宝 NPM 镜像](https://www.runoob.com/nodejs/nodejs-npm.html#taobaonpm)。)**

```bash
cnpm init -y
```

**安装核心包**

```bash
// Wechaty核心包
cnpm install --save wechaty
// wechaty-puppet协议包
cnpm install --save wechaty-puppet
//开发过程中，还需要用到qrcode-terminal这个包，作用就是将二维码输出在终端来供我们扫码登录
cnpm install --save qrcode-terminal

//node5以后可以不用使用--save
```

核心代码：
-----

**配置文件config.js**

```javascript

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
            大家有钱花: "xxxx1@chatroom",
            wechaty开发组: "xxxx2@chatroom"
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
        //阻断不使用机器人回复的好友列表（wxid）
        robotBlockList: ['tengxun', 'tengxun1'],
        //阻断不使用机器人群回复的好友列表（wxid）
        robotQunBlockList: ['tengxun', 'tengxun2']
    },
    //三方api信息
    thirdApi: {
        // http://www.itpk.cn/    ai机器人
        itpk: {
            apiKey: "xxx",
            apiSecret: "xxx"
        },
        // http://www.tianqiapi.com/    天气预报
        tianqiapi: {
            appId: "zzz",
            appSecret: "zzz"
        }
    }
};
```

**启动文件www**

在Create HTTP server.后引入socketio和wechaty，进行启动

*   引入socketio，调用封装的getSocketio()进行初始化启动；
*   引入donut，调用封装的run()进行初始化启动；

```javascript
/**
 * Create socket.io server.
 */

var io = require('../socketio');
io.getSocketio(server);


/**
 * Create puppet_donut server.
 */

var puppet_donut = require('../donut');
puppet_donut.run();
```

**socket服务 socketio.js文件**

该示例主要介绍了socket发送机制，如发送给自己，发送给初自己外的其他用户（广播），推送给所有人；（还可以推送给某一个socket连接用户，通过id，这里不介绍了）

1.  监听客户端的消息；
2.  监听客户端的微信消息并发送给相关好友；
3.  封装接口sendWechatLoginMsg、sendWechatMsg给wechaty调用；

```javascript

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
```

**donut服务 donut.js文件**

该示例主要介绍了引用wechaty包，实现wechaty初始化、加入群聊、退出群聊、消息等监听和多种发送消息函数封装

*   bot初始化；
*   实现bot监听（OnMessage、OnRoomJoin...）；
*   消息发送（文本、媒体、链接等消息）；

```javascript

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
        .on("room-join", onRoomJoin)    // 加入群聊监听
        .on("room-leave", onRoomLeave)  // 退出群聊房间监听
        .on("message", onMessage(bot))  // 消息监听
        .on("friendship", onFriendShip) // 好友添加监听
        .start();
};

module.exports = puppet_donut;
```

### Wechaty监听

这边重点描述下wechaty的监听示例，这也是为什么单独把几个监听业务给抽出来到wechaty目录下的原因之一。

*   scan                //扫码登录监听
*   login                //登录成功监听
*   room-join        //加入群聊监听
*   room-leave     //退出群聊监听
*   message        //消息通知监听
*   friendship       //好友添加监听

### **初始化**

```javascript
    bot = new Wechaty({
        puppet: 'wechaty-puppet-hostie',
        puppetOptions: {
            token,
        },
        name: config.name
    });
```

### 发送文本消息给好友

```javascript
//发送文本消息给联系人
puppet_donut.sendTextMsgToContact = async function(friendName, text){
    const contact = await bot.Contact.find({name: friendName});  //根据昵称搜索好友 change 'lijiarui' to any of your contact name in wechat
    if(!contact) return; //好友不存在直接返回
    await contact.say(text); //调用contact对象的say方法发送消息，contact对象很多方法，参考官方文档
};
```

这里传入两个参数

*   friendName  //好友昵称，这里可以调用对象Contact的find({name: friendName})函数进行好友查询
*   text               //发送的文本内容

其他的发送方式在代码里，这里直接看代码，不一一解释（代码详细注释，建议参考官方文档）

### **监听配置启动**

```javascript
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
        .on("room-join", onRoomJoin)    // 加入群聊监听
        .on("room-leave", onRoomLeave)  // 退出群聊房间监听
        .on("message", onMessage(bot))  // 消息监听
        .on("friendship", onFriendShip) // 好友添加监听
        .start();
```

### **scan**（顾名思义，是用于扫码登录的一个监听）

```javascript
                QrcodeTerminal.generate(qrcode, {
                    small: true
                });
```

这里代码较简单，意思是前面通过

```javascript
const QrcodeTerminal = require('qrcode-terminal');
```

引用qrcode-terminal模块，用于在终端进行二维码输出，方便我们测试扫码；

我们借助`Qrterminal.generate`这个API将 qr 码输出到终端而已，后面那个`small`参数是因为`qrcode-terminal` 这个包默认输出的二维码很大，给它变小一些；

这边有一个坑，在webstorm上打码的时候，在终端输出的二维码是这样的，

![](https://img-blog.csdnimg.cn/20201210101957109.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RvcGhpZ2htaQ==,size_16,color_FFFFFF,t_70)

这时候我们需要把这些字符串复制到码农神器notepad++里，如下图

![](https://img-blog.csdnimg.cn/20201210102118742.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RvcGhpZ2htaQ==,size_16,color_FFFFFF,t_70)

然后进行扫码登录；

这个问题我在centos下测试是没有这个问题，生产上大家不用担心。

### **onFriendShip**

用于好友监听的监听，这块逻辑比较简单（参看别人代码，直接撸过来的，哈哈哈，在此感谢这位朋友）；

监听好友添加的请求通知，如果打招呼信息hello()内容符合关键词列表，则进行允予通过accept();

这里我看了官方文档，可实现的业务很多，大家可参考官方api进行更多业务拓展！！！

```javascript
const { Friendship } = require("wechaty");
// 配置文件
const config = require("../config");
const io = require('../socketio');
// 好友添加验证消息自动同意关键字数组
const addFriendKeywords = config.personal.addFriendKeywords;

// 好友添加监听回调
module.exports = async function onFriendShip(friendship) {
    let logMsg;
    try {
        logMsg = "添加好友" + friendship.contact().name();
        console.log(logMsg);
        switch (friendship.type()) {
            /**
             * 1. 新的好友请求
             * 设置请求后，我们可以从request.hello中获得验证消息,
             * 并通过`request.accept（）`接受此请求
             */
            case Friendship.Type.Receive:
                // 判断配置信息中是否存在该验证消息
                if (addFriendKeywords.some(v => v == friendship.hello())) {
                    logMsg = `自动通过验证，因为验证消息是"${friendship.hello()}"`;
                    // 通过验证
                    await friendship.accept()
                } else {
                    logMsg = "不自动通过，因为验证消息是: " + friendship.hello();
                }
                break;

            /**
             * 2. 友谊确认
             */
            case Friendship.Type.Confirm:
                logMsg = "friend ship confirmed with " + friendship.contact().name();
                break
        }
        console.log(logMsg)
        io.sendWechatMsg(logMsg);
    } catch (e) {
        logMsg = e.message
    }
};
```

### onRoomJoin

这里主要监听用户加入房间的回调

```javascript
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
```

这里我们说明下，如果是在配置白名单roomJoinReply里的群，只要有新人加入，我们就发一个欢迎词并@他下

这些内容我们现在放在config中，实际业务肯定是放在db中，业务启动去获取或实时监听；

此回调接收三个参数

*   room 群聊实例
*   inviteeList 受邀者名单
*   inviter 邀请者

有了房间，受邀者，邀请者，这里可实现的业务就多了~~此处啪啦啪啦省略800字...

做一下判断就可以了，这里的`room.id`就是我们配置的管理群组列表对象roomJoinReply的value值

为什么要有管理群组列表对象呢？因为我们在登录了一个微信号时，群组进入监听是针对微信号中所有群组的

我的需求是要管理我的群组，所以事先跑了下程序，输出了`room`，然后群里发个消息，就拿到了我想管理的群组所有信息，id自然也在里面，然后写到了配置里，这里输出一个room的聊天信息示例，这里面的roomId就是房号

```javascript
{"_events":{},"_eventsCount":0,"id":"2098964982947510281","payload":{"filename":"","fromId":"发送者微信号","id":"209896498xxxxx消息唯一id","mentionIdList":["wxid_diuxkznxxxx群里好友wxid列表"],"roomId":"xxxx@chatroom","text":"@Oreo 北京天气","timestamp":1607568215000,"toId":"","type":7}}
```

接下来就是，监听到新加入，把受邀者列表遍历一下，使用`room.say`方法发送群消息即可，受邀者列表里存的就是加入的微信号实例，`say` 方法第一个参数就是要发送的消息，第二个参数就是为了@此人一下。。。其他业务开发请参考[官方文档（再来一个传送门）](https://wechaty.js.org/docs/api/)

###

### onRoomLeave

监听用户退出群聊

```javascript
const io = require('../socketio');
// 进入房间监听回调 room-群聊 leaver-退群者
module.exports = async function onRoomLeave(room, leaver) {
    console.log("群-【" + room.name + "】：" + leaver + " 退群");
    io.sendWechatMsg("群-【" + room.name + "】：" + leaver + " 退群");
};
```

这里的业务更简单了，主要是监听用户推出群聊

此回调接收三个参数

*   room 群聊实例
*   leaver 退出群聊者

### onMessage

主要监听消息的接收



```javascript
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
```

这里有个代码块

```javascript
let self = await msg.to();
```

参考别人的代码，这个协议版本这里获取出来的的是null，所以直接改成替换成自己的name（config中配置），可能是协议或版本不一样，api做了调整；这里我没细查官方api，欢迎补充。

**加入群聊监听** 这里有个业务点简单描述下，根据用户私聊的的内容，判断是否触发关键词，如果触发直接发送可加的群信息；

```javascript
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
```

**回复群名进行群邀请**

```javascript
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
```

### AI机器人

说到微信机器人，肯定不能脱离AI只能回复；这里的业务用到了自动陪聊和天气查询的功能，分别用到了如下api，相关参数配置在config文件，大家自行申请api 参数进行修改

*   免费机器人
    *   接口文档：[http://www.itpk.cn/](http://www.itpk.cn/)
    *   这里自行注册，还可以配置自定义回复，无答案回复，自行训练等等
*   免费天气
    *   接口文档：[http://www.tianqiapi.com/](http://www.tianqiapi.com/%C2%A0)
    *   这里官方文档竟然给了个公开能用的appid和appsecret...额。。。大家自行参考文档

这里没什么可细说，主要是调用第三方封装的api，进行一些关键词的自动答复；

涉及到api的http请求，所以需要引入如下两个模块

```bash
cnpm install --save request
cnpm install --save urlencode
```
这里小小吐槽下图灵，n年体验过图灵，这回本来想申请图灵的api测试，结果关注官方公众号等渠道体验。。。好吧，竟然没有机器人只能答复，遂找了家免费的AI机器人，希望大家别吐槽不智能~~~哈哈，毕竟itpk也需要慢慢进步嘛
```javascript
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
```
这里有个槽点，调用机器人api，设置返回的数据是json，但是返回的body字符串里开通竟然多个个'-'，完了还只能在编译器的控制台能看到，放到浏览器和别的编译器显示不出来，只能进行简单替换处理

```javascript
                        if (body.startsWith('﻿')) {//此处返回的json数据有些问题，额外处理
                            body = body.replace('﻿', '')
                        }
```

### 回归SocketIo 前端操作

这里为了体验下机器人的代入感，做了个前端demo（很简陋，这里别吐槽。。。就是为了和socket结合一起实时看效果；忽略右上角的红x...调试时中断服务的原因...）

![](https://img-blog.csdnimg.cn/20201210112918437.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RvcGhpZ2htaQ==,size_16,color_FFFFFF,t_70)

**这里简介下nodejs express socketio的一些使用**

前端引用socket.io.js，为了方式前后端socket版本不一致带来的问题，强烈建议如下引用方式

```javascript
<script src="/socket.io/socket.io.js"></script>
```

会直接调用接口/socket.io目录下的js文件，实际调用到modules目录下的文件

![](https://img-blog.csdnimg.cn/20201210113825645.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RvcGhpZ2htaQ==,size_16,color_FFFFFF,t_70)

前端建立socket连接



```javascript
 var socket = io(url);
```

建立连接后，监听名为getMsg的事件

```javascript
        socket.on('getMsg', data => {
            console.log('服务端消息：',  data);
            msg.innerHTML = `${data} <br/>`;
        })
```

建立连接，想服务端推送数据（socket.emit()），可以是String，可以是json对象

```javascript
        function sendWxmsg(){
            var friendNick = document.querySelector('#friendNick').value;
            var wechatContent = document.querySelector('#wechatContent').value;
            if(!friendNick || !wechatContent){
                alert("请输入信息");
                return;
            }
            var wechatSend = {
                friendNick: friendNick,
                wechatContent: wechatContent
            };
            socket.emit('sendWechatText', wechatSend);
        }
```

### 回归SocketIo 后端操作

初始化socketio

```javascript
io = require("socket.io")(server);
```

监听客户端的连接，这里socketio知识点很多，比如多客户端连接。通过id和session区分等，建议搭建参考[官方文档](https://socket.io/)，官方对socketio支持很赞，java，python，nodejs等等

```javascript
io.sockets.on('connection', function (socket) {});
```

事件监听，这里举例’send‘事件监听，具体触发如下

*   调用初始化的io进行emit()或send()，可向所有用户推送该消息（适用场景向所有客户端推送紧急通知）
*   调用该监听通道，向当前用户回复消息socket.emit()
*   调用当前监听通道，向出自己外的其他用户进行广播推送socket.broadcast.emit()
*   调用初始化的io向某个客户端进行单独的消息推送io.to(socketedId).emit()

```javascript
        //监听事件send
        socket.on("send", data => {  // 监听的频道必须和客户端监听的频道相同，等待消息
            // io.emit("监听频道", "发送的信息");  // 向所有客户端发送信息
            console.log('客户端发送的内容：', data);
            io.emit('getMsg', '我是返回的消息... ...' + common.currentDateTime());//触发所有用户
            // socket.emit('getMsg', '我是返回的消息... ...' + new Date().getTime());//触发当前用户
            // socket.broadcast.emit('getMsg', '我是返回的消息... ...' + new Date().getTime());//触发除去该用户以外的用户
            // io.to(socketedId).emit('getMsg', '我是返回的消息... ...' + new Date().getTime());//触发指定用户
        });
```

此demo的核心代码基本就介绍这么多了...

### 写在最后

*   config的很多配置在实际业务中应业务化处理，比如db化接受实时操作；
*   关于wechaty，根据个人的体验，除了没有朋友圈，视频号相关的内容操作，其他的基本满足机器人、私域相关的操作，支持多语言，提供Java，Go，Python，Javascript，C#等主流语言的兼容支持，根据官方api，业务可扩展性极强；
*   关于nodejs，由于作者之前并没有nodejs实战开发经验，也是基于这个demo看了nodejs相关文档，学习express框架初学，提供不了太多解读。不过nodejs基于脚本语言，学习起来还是很快；
*   关于socketio，和nodejs结合在一起，体验nodejs的异步非阻塞，简直要起了飞；
*   环境
    *   系统：win7、centos7.6成功运行
    *   nodejs版本：windows下调试：v12.16.2；centos：v10.16.0；（wechaty对node版本有要求，不同协议版本最低要求不一致，大家自行参考开源说明和官方文档）
*   代码
    *   主要是抽空码出来的，没有太多时间优化
    *   有一些业务代码写好了，但是并没有接入使用，欢迎大家补充
    *   刚开始查找微信助手相关功能时在CSDN看到这篇文章[《Wechaty|不使用微信的web协议的机器人》](https://blog.csdn.net/lx91216/article/details/106257248)，勾起了我对wechaty的回忆和探索，因此这篇文档很多内容上也是参考了它（时间关系甚至直接搬运，希望原文作者原谅哈...）
    *   源码直通车→[点我《wechaty-robot-lite》](https://github.com/iTingle/wechaty-robot-lite)

后面有空，会持续迭代功能，后续需求扩展

*   推送
    *   例如每日早8点，拉取头条`热门文章`发送至群聊
    *   可设置定时任务，定时给自己/群聊发送消息
    *   好友可定制天气预报定时推送功能
*   消息监听发送
    *   同步展示推送媒体消息等
    *   支持发送动图，表情包等信息
    *   开启斗图模式
*   群聊功能消息管理
    *   监听群聊中消息，有不正当言论时或不文明用语对其警告
    *   涉zheng，涉huang等言论清除出群
*   群聊游戏
*   后台管理系统(可视化配置及群聊数据统计)
    *   丰富聊天功能，提供媒体消息发送，资源库内容发送
    *   统计群聊活跃度，关键词通知统计功能

### PS：

这篇文档说的最多的应该是”官方文档“四个字了吧，这里再点一下，`认真看文档！！！`

### 参考文档

*   [Wechaty官方API](https://wechaty.js.org/docs/api/)
*   [Wechaty官方文档](https://wechaty.github.io/wechaty/)
*   [Wechaty官方示例](https://github.com/juzibot/donut-tester#example)
*   [socketio](https://socket.io/)
*   [nodejs](http://nodejs.cn/)
*   [express框架](https://www.expressjs.com.cn/)

### 效果截图

![](https://img-blog.csdnimg.cn/20201210122920648.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RvcGhpZ2htaQ==,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/20201210122949780.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RvcGhpZ2htaQ==,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/20201210123153241.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RvcGhpZ2htaQ==,size_16,color_FFFFFF,t_70)

待完结