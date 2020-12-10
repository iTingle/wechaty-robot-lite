/**
 * @Author: Tingle
 * @Date: 2020/12/9 17:12
 * @LastEditors: abc
 * @LastEditTime: 2020/12/9 17:12
 * @Description: common
 */

var common = {};


common.isJSON = function(str){
    if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return true;
            }else{
                return false;
            }

        } catch(e) {
            console.log('error：'+str+'!!!'+e);
            return false;
        }
    }
    console.log('It is not a string!')
};

common.currentDate = function(){
    var timezone = 8;
    var offset_GMT = new Date().getTimezoneOffset();
    var nowDate = new Date().getTime();

    var today = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);
    var date = today.getFullYear() + "-" + twoDigits(today.getMonth() + 1) + "-" + twoDigits(today.getDate());
    return date;
};

common.currentTime = function(){
    var timezone = 8;
    var offset_GMT = new Date().getTimezoneOffset();
    var nowDate = new Date().getTime();

    var today = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);
    var time = twoDigits(today.getHours()) + ":" + twoDigits(today.getMinutes()) + ":" + twoDigits(today.getSeconds());
    return time;
};

common.currentDateTime = function(){
  return this.currentDate() + '  ' + this.currentTime();
};

function twoDigits(val) {
    if (val < 10) return "0" + val;
    return val;
}


module.exports = common;