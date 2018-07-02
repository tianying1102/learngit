$(function(){
    var time_hour = document.getElementById("time_1");
//console.log(time_hour);
    var time_minute = document.getElementById("time_2");
    var time_second = document.getElementById("time_3");
    /*设置固定的48小时*/
    var time_end;
    time_end=$.fn.cookie('time_end')|| 172800;
    var int_hour, int_minute, int_second;
    console.log($.fn.cookie('time_end'));
//定义倒计时函数
    time=setInterval(function(){
        $.fn.cookie('time_end');
        time_end--;
        $.fn.cookie('time_end',time_end,{ expires : 2 });
        if(time_end<0){
            time_end= 172800;
        }
        int_hour = Math.floor(time_end/3600);
        //分钟
        int_minute = Math.floor(time_end%3600/60)
        //毫秒
        int_second = Math.floor(time_end%60)
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
        //小时
    },1000);//设置每一秒调用一次倒计时函数
});
