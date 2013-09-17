var funcTools = {};
//对象转成字符串
funcTools.objToString = function(obj){
		var a = obj;
		var k1 = "";
		for(i in a){
		  k1 += i+":"+a[i]+",";
		}
		k1 = k1.slice(0,k1.length-1);
		return k1;
}
//日期格式化
//var dates = funcTools.format( new Date() , "yyyy-MM-DD hh:mm:ss");
funcTools.format = function(date , formatStr){ 
		var str = formatStr; 
		str=str.replace(/yyyy|YYYY/,date.getFullYear()); 
		str=str.replace(/yy|YY/,(date.getYear() % 100)>9?(date.getYear() % 100).toString():"0" + (date.getYear() % 100)); 
		str=str.replace(/MM/,date.getMonth()>8?(date.getMonth()+1).toString():"0" + (date.getMonth()+1)); 
		str=str.replace(/M/g,date.getMonth()+1); 
		str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():"0" + date.getDate()); 
		str=str.replace(/d|D/g,date.getDate()); 
		str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():"0" + date.getHours()); 
		str=str.replace(/h|H/g,date.getHours()); 
		str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():"0" + date.getMinutes()); 
		str=str.replace(/m/g,date.getMinutes()); 
		str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():"0" + date.getSeconds()); 
		str=str.replace(/s|S/g,date.getSeconds()); 
		return str; 
	}

//一年的第几周
funcTools.weekOfYear  = function(year,   month,   day){
	  var   date1   =   new   Date(year,   0,   1);     
	  var   date2   =   new   Date(year,   month-1,   day,   1);     
	  var   dayMS   =   24*60*60*1000;     
	  var   firstDay   =   (7-date1.getDay())*dayMS;     
	  var   weekMS   =   7*dayMS;     
	  date1   =   date1.getTime();     
	  date2   =   date2.getTime();     
	  return   Math.ceil((date2-date1-firstDay)/weekMS)+1;     
 }    
funcTools.dateFromWeek  = function(year,   week,   day){     
	  //   year       Äê     
	  //   week       ÖÜ     
	  //   day         ÐÇÆÚ   (0-6,   0´ú±íÖÜÈÕ)     
	  var   date1   =   new   Date(year,   0,   1);     
	  var   dayMS   =   24*60*60*1000;     
	  var   firstDay   =   (7-date1.getDay())*dayMS;     
	  var   weekMS   =   (week-2)*7*dayMS;     
	  var   result   =   date1.getTime()+firstDay+weekMS+day*dayMS;     
	  date1.setTime(result);     
	  // return   date1.toLocaleDateString();     
	 return   date1;     
}
//周
funcTools.showWeek = function(tToday){
         var week = funcTools.weekOfYear(tToday.getYear() , tToday.getMonth()+1 , tToday.getDate() );
		 var xingqiri = funcTools.dateFromWeek( tToday.getYear() , week , 0);
		 var xingqiliu = funcTools.dateFromWeek( tToday.getYear() , week , 6);
		 var format_xingqiri = funcTools.format( xingqiri , "yyyy/MM/DD");
		 var format_xingqiliu = funcTools.format( xingqiliu , "yyyy/MM/DD");
		 return [xingqiri,xingqiliu];
}
//对比日期
funcTools.compareDate = function(DateOne,DateTwo){ 
	var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ("-"));
	var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ("-")+1);
	var OneYear = DateOne.substring(0,DateOne.indexOf ("-"));

	var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ("-"));
	var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ("-")+1);
	var TwoYear = DateTwo.substring(0,DateTwo.indexOf ("-"));

	if (Date.parse(OneMonth+"/"+OneDay+"/"+OneYear) > Date.parse(TwoMonth+"/"+TwoDay+"/"+TwoYear)){
		return true;
	}else{
		return false;
	}
}
/*  
字符串转日期
parseDate('2006-1-1') return new Date(2006,0,1)  
parseDate(' 2006-1-1 ') return new Date(2006,0,1)  
parseDate('2006-1-1 15:14:16') return new Date(2006,0,1,15,14,16)  
parseDate(' 2006-1-1 15:14:16 ') return new Date(2006,0,1,15,14,16);  
parseDate('2006-1-1 15:14:16.254') return new Date(2006,0,1,15,14,16,254)  
parseDate(' 2006-1-1 15:14:16.254 ') return new Date(2006,0,1,15,14,16,254)  
parseDate('²»ÕýÈ·µÄ¸ñÊ½') retrun null  
*/  
funcTools.parseDate = function(str){   
   if(typeof str == 'string'){   
      var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);   
	  if(results && results.length>3)   
      return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]));    
      results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);   
      if(results && results.length>6)   
      return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]),parseInt(results[4]),parseInt(results[5]),parseInt(results[6]));    
      results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);   
      if(results && results.length>7)   
        return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]),parseInt(results[4]),parseInt(results[5]),parseInt(results[6]),parseInt(results[7]));    
      }   
     return null;   
}
/*
var   s   =   "2005-02-1 09:41:30";   
var   d   =   funcTools.parseDate2(s);
*/
funcTools.parseDate2 = function(str) {
	var d = new Date(Date.parse(str.replace(/-/g,"/")));   
	return d;
}

/**
funcTools.parseDateToString();
*/  
funcTools.formatDateToString = function(v){   
if(typeof v == 'string') v =  funcTools.parseDate(v);   
if(v instanceof Date){   
    var y = v.getFullYear();   
    var m = v.getMonth() + 1;   
    var d = v.getDate();   
    var h = v.getHours();   
    var i = v.getMinutes();   
    var s = v.getSeconds();   
    var ms = v.getMilliseconds();      
    if(ms>0) return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s + '.' + ms;   
    if(h>0 || i>0 || s>0) return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;   
    return y + '-' + m + '-' + d;   
  }   
  return '';   
}

//日期差
function DateDiff(sDate1, sDate2){ 
	var aDate, oDate1, oDate2, iDays
	aDate = sDate1.split("-")
	oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //×ª»»Îª12-18-2002¸ñÊ½
	aDate = sDate2.split("-")
	oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
	iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24) //°ÑÏà²îµÄºÁÃëÊý×ª»»ÎªÌìÊý
	return iDays
} 


		
/*
日期差
*/
function DateDiffByType(interval, date1, date2){
	 var objInterval = {'D' : 1000*60*60*24,'H' : 1000*60*60,'M' : 1000*60,'S' : 1000};
	 interval = interval.toUpperCase();
	// var dt1 = Date.parse(date1.replace(/-/g,'/'));
	// var dt2 = Date.parse(date2.replace(/-/g,'/'));
	 var dt1 = date1;
	 var dt2 = date2;
	 try
	 {
		   return Math.round((dt2 - dt1) / eval('(objInterval.' + interval + ')'));
	 }catch(e)
	 {
		   return e.message;
	 }
}

/*
 *日期差
*/
Date.prototype.dateDiff = function(interval,objDate){
  var dtEnd = new Date(objDate);
  if(isNaN(dtEnd)) return undefined;
  switch (interval) {
    case "s":return parseInt((dtEnd - this) / 1000);
    case "n":return parseInt((dtEnd - this) / 60000);
    case "h":return parseInt((dtEnd - this) / 3600000);
    case "d":return parseInt((dtEnd - this) / 86400000);
    case "w":return parseInt((dtEnd - this) / (86400000 * 7));
    case "m":return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-this.getFullYear())*12) - (this.getMonth()+1);
    case "y":return dtEnd.getFullYear() - this.getFullYear();
  }
}
// data.formatDD( "yyyy-MM-DD hh:mm:ss");
Date.prototype.formatDD = function( formatStr){ 
  var date = this;
  var str = formatStr; 
  str=str.replace(/yyyy|YYYY/,date.getFullYear()); 
  str=str.replace(/yy|YY/,(date.getYear() % 100)>9?(date.getYear() % 100).toString():"0" + (date.getYear() % 100)); 
  str=str.replace(/MM/,date.getMonth()>8?(date.getMonth()+1).toString():"0" + (date.getMonth()+1)); 
  str=str.replace(/M/g,date.getMonth()+1); 
  str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():"0" + date.getDate()); 
  str=str.replace(/d|D/g,date.getDate()); 
  str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():"0" + date.getHours()); 
  str=str.replace(/h|H/g,date.getHours()); 
  str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():"0" + date.getMinutes()); 
  str=str.replace(/m/g,date.getMinutes()); 
  str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():"0" + date.getSeconds()); 
  str=str.replace(/s|S/g,date.getSeconds()); 
  return str; 
}
//js获取当前月的第一天和最后一天:
function getFirstAndLastMonthDay(year, month){
	var curDate = new Date();
	var firstdate = curDate.getFullYear() + "-"+ curDate.getMonth + "-01";
   var day = new Date(year,month,0);   
   var lastdate = year + '-' + month + '-' + day.getDate();//获取当月最后一天日期    
   

   return lastdate;  
}  