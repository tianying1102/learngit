$(function(){
    var time_hour = document.getElementById("time_1");
//console.log(time_hour);
    var time_minute = document.getElementById("time_2");
    var time_second = document.getElementById("time_3");
    var time_end = new Date("2018/02/07 00:00:00");  // 设定活动结束结束时间
    time_end = time_end.getTime();
//定义倒计时函数
    function count_down(){
        var time_now = new Date();  // 获取当前时间
        time_now = time_now.getTime();
        var time_distance = time_end - time_now;  // 时间差：活动结束时间减去当前时间
        var int_hour, int_minute, int_second;
        if(time_distance >= 0){
            // 相减的差数换算成天数
            /* int_day = Math.floor(time_distance/86400000)
             time_distance -= int_day * 86400000;*/
            // 相减的差数换算成小时
            int_hour = Math.floor(time_distance/3600000)
            time_distance -= int_hour * 3600000;
// 相减的差数换算成分钟
            int_minute = Math.floor(time_distance/60000)
            time_distance -= int_minute * 60000;
            // 相减的差数换算成秒数
            int_second = Math.floor(time_distance/1000)
            // 判断小时小于10时，前面加0进行占位
            if(int_hour < 10)
                int_hour = "0" + int_hour;
// 判断分钟小于10时，前面加0进行占位
            if(int_minute < 10)
                int_minute = "0" + int_minute;
            // 判断秒数小于10时，前面加0进行占位
            if(int_second < 10)
                int_second = "0" + int_second;
// 显示倒计时效果
            time_hour.innerHTML = int_hour;
            time_minute.innerHTML = int_minute;
            time_second.innerHTML = int_second;
            setTimeout("count_down()",1000);
        }else{
//在这里可以非常灵活的设置：比如往后推迟2天或往后加2天：2*24*60*60*1000

//比如往后推迟1天或往后加1天：1*24*60*60*1000

//比如往后推迟2小时或往后加2小时：2*60*60*1000

// 比如往后推迟40分钟或往后加40分钟：40*1000这里设置根据大家需要，灵活设置。
            time_end=time_end+2*24*60*60*1000;
            setTimeout("count_down()",1000);
        }
    }
    setTimeout("count_down()",1000);//设置每一秒调用一次倒计时函数
});
