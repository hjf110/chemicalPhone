const tool = {
	/**
	 * 获取现在时刻的日期，星期几，时分秒
	 * @param {Object} type 1日期 2时间 3星期几 4日期和时间
	 */
	getTime(type){
	        let date = new Date(),
	        currentDate,
	        currentTime,
	        seperator = "-", // 如果想要其他格式 只需 修改这里 
	        year = date.getFullYear(),
	        month = date.getMonth() + 1,
	        weex = date.getDay(),
	        day = date.getDate(),
	        hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
	        minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
	        second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	        month >= 1 && month <= 9 ? (month = "0" + month) : "";
	        day >= 0 && day <= 9 ? (day = "0" + day) : "";
	          //当前 日期
	         currentDate = year + seperator + month + seperator + day;
	          //当前 时间
	         currentTime = hour + ":" + minute + ":" + second;
	          // 输出格式 为 2018-8-27 14:45:33
	         // console.log(currentDate +" "+ currentTime);
	        
	         if(type==0){
	             return currentDate
	         }
	         else if(type==1){
	             return currentTime;
	         }
	         else if(type==2){
	             if(weex==1){
	                 return '星期一'
	             }if(weex==2){
	                 return '星期二'
	             }if(weex==3){
	                 return '星期三'
	             }if(weex==4){
	                 return '星期四'
	             }if(weex==5){
	                 return '星期五'
	             }if(weex==6){
	                 return '星期六'
	             }if(weex==7){
	                 return '星期日'
	             }
	         }
	         else{
	            return currentDate+" "+ currentTime;
	         }
	},
	/**
	 * 获取一个月有几天
	 * @param {Object} year  年份
	 * @param {Object} month 月份
	 */
    getMonthDay(year, month) {
	  let days = new Date(year, month, 0).getDate();
	  return days
	},
	/**
	 * 获取日期 格式为 yyyy-MM-dd
	 * @param {Object} date
	 */
	getDateStr(date) {
	    var year = "";
	    var month = "";
	    var day = "";
	    var now = date;
	    year = ""+now.getFullYear();
	    if((now.getMonth()+1)<10){
	        month = "0"+(now.getMonth()+1);
	    }else{
	        month = ""+(now.getMonth()+1);
	    }
	    if((now.getDate())<10){
	        day = "0"+(now.getDate());
	    }else{
	        day = ""+(now.getDate());
	    }
	    return year+"-"+month+"-"+day;
	},
	/** 
	* 获得相对当前周AddWeekCount个周的起止日期 
	* AddWeekCount为0代表当前周   为-1代表上一个周   为1代表下一个周以此类推
	* **/ 
	 getWeekStartAndEnd(AddWeekCount=0) { 
	    //起止日期数组   
	    var startStop = new Array(); 
	    //一天的毫秒数   
	    var millisecond = 1000 * 60 * 60 * 24; 
	    //获取当前时间   
	    var currentDate = new Date();
	    //相对于当前日期AddWeekCount个周的日期
	    currentDate = new Date(currentDate.getTime() + (millisecond * 7*AddWeekCount));
	    //返回date是一周中的某一天
	    var week = currentDate.getDay(); 
	    //返回date是一个月中的某一天   
	    var month = currentDate.getDate();
	    //减去的天数   
	    var minusDay = week != 0 ? week - 1 : 6; 
	    //获得当前周的第一天   
	    var currentWeekFirstDay = new Date(currentDate.getTime() - (millisecond * minusDay)); 
	    //获得当前周的最后一天
	     var currentWeekLastDay = new Date(currentWeekFirstDay.getTime() + (millisecond * 6));
	    //添加至数组   
	    startStop.push(this.getDateStr(currentWeekFirstDay)); 
	    startStop.push(this.getDateStr(currentWeekLastDay)); 
	   
	    return startStop; 
	} 
}

export default tool;
