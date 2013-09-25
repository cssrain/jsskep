/************************************************

	Jsskep---This is a javascript skep.
    由于jsskep是多人合作的共同结果，所以中间
	难免有方法重复，另外有的方法也许有错误，
	时间有限，我们并未一个个去测试。如果你发现
	错误，请即时跟我们联系。
	Email: cssrain@gmail.com
	Blog:  http://www.cssrain.cn

	使用方法：
	调用里面的方法可以使用：
	dowell.命名空间.方法名(参数);

    2010.9.27

*************************************************/


//初始化
if(typeof(dowell)=="undefined"){
	dowell={}
};

//命名空间
dowell.namespace=function(){
	var A=arguments,E=null,C,B,D;
	for(C=0;C<A.length;C=C+1){
		D=A[C].split(".");
		E=dowell;
		for(B=(D[0]=="dowell")?1:0;B<D.length;	B=B+1){
			E[D[B]]=E[D[B]]||{} ;
			E=E[D[B]]
		} 
	} 
	return E;
};



//浏览器
//	if (dowell.browser.isMozilla) {
//	 alert("browse is FF.")
//	}
dowell.namespace("browser");
dowell.browser={
	//版本号
    version : "1.0",
	isMozilla : (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined') && (typeof HTMLDocument!='undefined'),
    isIE : window.ActiveXObject ? true : false,
    isOpera : (navigator.userAgent.toLowerCase().indexOf("opera")!=-1)
}


//dom操作空间
dowell.namespace("dom");
dowell.dom={
	//版本号
    version : "1.0",
	//根据ID获取DOM元素
	ById : function(id) {
		return document.getElementById(id);
	},
	//根据class获取DOM元素
	ByClass : function(className) {
		var children = document.getElementsByTagName('*') || document.all;
		var elements = new Array();
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			var classNames = child.className.split(' ');
			for (var j = 0; j < classNames.length; j++) {
				if (classNames[j] == className) {
					elements.push(child);
					break;
				}
			}
		}
		return elements; //返回数组
	},
	//根据class获取DOM元素。
	//获取document内的超链接class是“info-links”的。
	//dowell.dom.ByClassName(document, "a", "info-links");
	//获取container内的div的class是col的.
	//dowell.dom.ByClassName(document.getElementById("container"), "div", "col"); 
	//获取document内的所有class是“click-me”的。
	//dowell.dom.ByClassName(document, "*", "click-me");
    ByClassName :	function(oElm, strTagName, strClassName){
		var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
		var arrReturnElements = new Array();
		strClassName = strClassName.replace(/-/g, "\-");
		var oRegExp = new RegExp("(^|\s)" + strClassName + "(\s|$)");	
		var oElement;	
		for(var i=0; i<arrElements.length; i++){	
		oElement = arrElements[i];	
		if(oRegExp.test(oElement.className)){	
		arrReturnElements.push(oElement);	
		  }	
		}
		return (arrReturnElements)
	},
	//在目标元素后插入新元素。DOM没有提供insertAfter(),只提供了一个insertBefore()方法。
	insertAfter : function(newElement,targetElement) {
		  var parent = targetElement.parentNode;
		  if (parent.lastChild == targetElement) {// 如果最后的节点是目标元素，则直接添加。因为默认是最后
			parent.appendChild(newElement);
		  } else {
			parent.insertBefore(newElement,targetElement.nextSibling);//如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面。
		  }
	},
	//获取当前元素的下一个元素节点
	getNextElement : function (node) {//获取当前元素的元素节点
		  if(node.nextSibling.nodeType == 1) {
			return node.nextSibling;
		  }
		  if (node.nextSibling.nextSibling) {
			return this.getNextElement(node.nextSibling.nextSibling);//如果不是,继续查询下一个,直到if(node.nodeType == 1) 
		  }
		  return null;
	},
	//追加样式
	addClass : function (element,value) { //追加样式，而不是替换样式
		  if (!element.className) {
			element.className = value;
		  } else {
			element.className+= " ";
			element.className+= value;
		  }
	 },
	//解决外嵌样式style , 用js获取不到的问题。
	//	var e1 = document.getElementById("exep1");
	//  alert(dowell.dom.getStyle(e1,"fontSize"));
	getStyle : function(elem, name){
			if(elem.style[name])
				return elem.style[name];
			else if(elem.currentStyle)	//ie
				return elem.currentStyle[name];
			else if(document.defaultView && document.defaultView.getComputedStyle){	//w3c
				name = name.replace(/([A-Z])/g,"-$1");
				name = name.toLowerCase();
				
				var s = document.defaultView.getComputedStyle(elem,"");
				return s && s.getPropertyValue(name);
			} else
				return null
	},
	//表格隔行变色. 引入 addClass()函数。
	stripeTables : function(classNames) {
	  if (!document.getElementsByTagName) return false;
	  var tables = document.getElementsByTagName("table");
	  for (var i=0; i<tables.length; i++) {
		var odd = false;
		var rows = tables[i].getElementsByTagName("tr");
		for (var j=0; j<rows.length; j++) {
		  if (odd == true) {
			this.addClass( rows[j], classNames );//classNames为样式名
			odd = false;
		  } else {
			odd = true;
		  }
		}
	  }
	},
	//滑过变色. 引入 addClass()函数。
	highlightRows : function (tagName , classNames) {
	  var _self = this;
	  if(!document.getElementsByTagName) return false;
	  var rows = document.getElementsByTagName(tagName);
	  for (var i=0; i<rows.length; i++) {
		rows[i].oldClassName = rows[i].className
		rows[i].onmouseover = function() {
		  _self.addClass(this, classNames );//classNames为样式名
		}
		rows[i].onmouseout = function() {
		  this.className = this.oldClassName
		}
	  }
	},
	//表格隔行变色 + 滑过变色 
	//参数设置：id 为表格的id
	//class1为奇数行的颜色
	//class2为偶数行的颜色
	//class3为鼠标滑过颜色
	stripeTableById : function( id , class1 , class2 , class3  ){
		  var para = document.getElementById(id);
		  var tr  = para.getElementsByTagName("tr");
		  var odd = false;
		  for(var i=0 ; i < tr.length ; i++ ){
				if(odd==true){
				 tr[i].className = class1;      
				 odd=false;

				 tr[i].onmouseover =function(){
					this.className = class3;
				 }
				 tr[i].onmouseout =function(){
					this.className = class1;
				 }
				}
				else{
				 tr[i].className = class2;   
				 odd=true;

				  tr[i].onmouseover =function(){
					this.className = class3;
				 }
				  tr[i].onmouseout =function(){
					this.className = class2;
				 }
				}
		  }
	},
	// 获取显示高度
	getViewportHeight : function(){
		if (window.innerHeight!=window.undefined) return window.innerHeight;
		if (document.compatMode=='CSS1Compat') return document.documentElement.clientHeight;
		if (document.body) return document.body.clientHeight; 
		return window.undefined; 
	},
	// 获取显示宽度
	getViewportWidth : function(){
		if (window.innerWidth!=window.undefined) return window.innerWidth; 
		if (document.compatMode=='CSS1Compat') return document.documentElement.clientWidth; 
		if (document.body) return document.body.clientWidth; 
		return window.undefined; 
	}
}





//字符串操作空间
dowell.namespace("string");
dowell.string={
   //版本号
    version : "1.0",
   //将字符串前后空格,用空字符串替代
    trim : function(str){
		  return str.replace(/(^\s*)|(\s*$)/g,"");
	},
	//去除字符串的左侧的空格
    ltrim : function(str){
		  return str.replace(/(^\s*)/g, "");
	},
	 //去除字符串的右侧的空格
    rtrim : function(str){
		  return str.replace(/(\s*$)/g, "");
	},
   //替换字符串中的字符
    replaceAll : function(str,AFindText,ARepText){
		 raRegExp = new RegExp(AFindText,"g");
         return str.replace(raRegExp,ARepText);
	},
	//把中文按2个字符处理，返回字符串长度
	cLen : function(str){  
		 return str.replace(/[\u00FF-\uFFFF]/g,"  ").length;
	},
	//把中文按2个字符处理，返回字符串从startid到endid的内容
    cSubString :  function(str,start,end){
		var returnStr=''
		var currentNum=0;  //当前处理到的字符在字符串中的位置
		for(var i=0;i<str.length;i++){
			if(start<=currentNum && currentNum<end){
				returnStr+=str.charAt(i);
			};
			currentNum+=(str.charCodeAt(i)<=128?1:2);
		};
		return returnStr;
	},
	//按照指定字节长度截取字符串，超出部分用…（或者其他字符）代替
	showLeft : function(str,len){
		var endString  = arguments[2] || "…"; 
		var returnString= this.cSubString(str,0,parseInt(len));
		if (this.cLen(returnString)<this.cLen(str)){
			returnString+=endString;
		}
		return returnString;
	},
	//把字符串进行HTML编码
	HtmlEncode : function(str){
		 var s = "";
		 if (str.length == 0) return "";
		 s = str.replace(/&/g, "&amp;");
		 s = s.replace(/</g, "&lt;");
		 s = s.replace(/>/g, "&gt;");  
		 s = s.replace(/\'/g, "&#39;");
		 s = s.replace(/\"/g, "&quot;");
		 return s;
	},
	//把字符串进行HTML反编码
	unHtmlEncode : function(str){
		var s = "";   
		if (str.length == 0) return "";
		s = str.replace(/&amp;/g, "&");
		s = s.replace(/&lt;/g, "<");
		s = s.replace(/&gt;/g, ">"); 
		s = s.replace(/&#39;/g, "\'");   
		s = s.replace(/&quot;/g, "\""); 
		return s;   
	},
	//去除字符串中的所有非数字,(得到数字).
	getNumber : function(str){
		return str.replace(/[\D]/g,'');
	},
	//判断是否为中文
	isChn:function(str){
      var reg =/[^\u4E00-\u9FA5]/;
      if(reg.test(str)){
       return false;
      }
      return true;
	}
}

 

 
//数组操作空间
dowell.namespace("array");
dowell.array={
   //版本号
    version : "1.0",
	//去掉数组中重复的元素
	strip : function(arrays){
		if(arrays.length<2) return [arrays[0]]||[];
		var arr=[];
		for(var i=0;i<arrays.length;i++){
			arr.push(arrays.splice(i--,1));
			for(var j=0;j<arrays.length;j++){
				if(arrays[j]==arr[arr.length-1]){
					arrays.splice(j--,1);}}}
		return arr;
	},
	//得到l-h下标的数组
	limit :  function(arrays, l, h) {
		var _a = arrays ; 
		var ret = []; 
		l = l<0?0:l; h = h>_a.length?_a.length:h;
		for (var i=0; i<_a.length; i++) {
		if (i>=l && i<=h) ret[ret.length] = _a[i];
		if (i>h) break;
		};
		return ret;
	},
	//指定array是否包含指定的item
	//dowell.array.exists( arrays,item ) 包含true;不包含false;
	exists : function(arrays,item){
		for( var i = 0 ; i < arrays.length ; i++ )
		{
			if( item == arrays[i] )
			{
				return true;
			}
		}
		return false;
	},
	 /*
   * 功能:删除数组元素.
   * 参数:dx删除元素的下标.
   * 返回:在原数组上删除后的数组
   */
	removeByIndex : function(arrays , dx){
		if(isNaN(dx)||dx>arrays.length){return false;}
		for(var i=0,n=0;i<arrays.length;i++)
		{
			if(arrays[i]!=arrays[dx])
			{
				arrays[n++]=arrays[i]
			}
		}
		arrays.length-=1
		return arrays;
	},
	//删除指定的item,根据数组中的值
	removeByValue : function(arrays, item ){
			for( var i = 0 ; i < arrays.length ; i++ ){
				if( item == arrays[i] )
				{
					break;
				}
			}
			if( i == arrays.length ){
				return;
			}
			for( var j = i ; j < arrays.length - 1 ; j++ ){
				arrays[ j ] = arrays[ j + 1 ];
			}
			arrays.length--;
			return arrays;
	},
	//得到数组里重复的元素
	uniq :   function(arrays){
				var o = {};	
				var s = {};
				for (var i=0,j=0,k=0; i<arrays.length; i++){
					if (typeof o[arrays[i]] == 'undefined'){	
						o[arrays[i]] = j++;
					}else{
						if(typeof s[arrays[i]]=='undefined'){
							s[arrays[i]]=k++;
						}
					}
				}
				arrays.length = 0;
				for (var key in o){
					arrays[o[key]] = key;
				}
				var r = [];
				for(var key in s){
					r[s[key]] = key;
				}
				return r;
	},
	//交换指定两个元素的位置
	swap : function(arrays , i, j){
			var temp = arrays[i];
			arrays[i] = arrays[j];
			arrays[j] = temp;
			return arrays;
	},
	//选择排序，从小到大
	selectionSort : function (arrays){
			for (var i = 0; i < arrays.length; ++i){
				var index = i;
				for (var j = i + 1; j < arrays.length; ++j){	
					if (arrays[j] < arrays[index]) {
						index = j;
					}
				}
				var temp = arrays[i];
				arrays[i] = arrays[index];
				arrays[index] = temp;
			}
			return arrays;
	},
	//查找指定元素，返回元素位置
	find : function(arrays,obj){
		for (var i=0;i<arrays.length;i++){
			if(arrays[i]===obj)	{
				return i
			}
		}
		return -1;//没找到 ，返回-1 
	},
	/**
	 * 取数组并集
	 * a1/a2为要合并的两个数组
	 */
	arrIntersection : function(a1, a2){
	    var ao = {};
	    for(var i = a1.length - 1; i>= 0 ; i--){
	        ao[a1[i]] = true;
	    }
	    var ai = a1.concat([]);//防止a1被改变
	    for(i = 0; i < a2.length; i++){
	        if(!ao[a2[i]]){
	            ai.push(a2[i]);
	        }
	    }
	    return ai;
	}
}

//数字操作空间
dowell.namespace("number");
dowell.number={
    //版本号
    version : "1.0",
	//获取0-N之间的随机整数
	randomInt : function(num1){
		return Math.floor(Math.random()*num1);
	},
	//转换成中文大写金额 
    toMoney : function(num) {  
		var str1='零壹贰叁肆伍陆柒捌玖';
		var str2='万仟佰拾亿仟佰拾万仟佰拾元角分';
		var str5='',str3,tr4,i,j,ch1,ch2,nzero=0; 
		num=Math.abs(num).toFixed(2);
		str4=(num*100).toFixed(0).toString();
		j=str4.length; 
		if (j>15){
			return '溢出';
		}
		str2=str2.substr(15-j);
		for(i=0;i<j;i++){
			str3=str4.substr(i,1);
			if(i!=(j-3) && i!=(j-7) && i!=(j-11) && i!=(j-15)){
				if (str3=='0'){
					ch1='';
					ch2='';
					nzero=nzero + 1;
				}else{
					if(str3!='0' && nzero!=0){
						ch1='零' + str1.substr(str3*1,1);
						ch2=str2.substr(i,1);
						nzero=0;
					}else{
						ch1=str1.substr(str3*1,1);
						ch2=str2.substr(i,1);
						nzero=0;
					}
				}
			}else{
				if (str3!='0' && nzero!=0){
					ch1="零" + str1.substr(str3*1,1);
					ch2=str2.substr(i,1);
					nzero=0;
				}else{
					if (str3!='0' && nzero==0){
						ch1=str1.substr(str3*1,1);
						ch2=str2.substr(i,1);
						nzero=0;
					}else{
						if (str3=='0' && nzero >= 3){
							ch1='';
							ch2='';
							nzero=nzero + 1;
						}else{
							if (j >= 11){
								ch1='';
								nzero=nzero + 1;
							}else{
								ch1='';
								ch2=str2.substr(i,1);
								nzero=nzero + 1;
							}
						}
					}
				}
			}
			if (i==(j-11) || i==(j-3)){
				ch2=str2.substr(i,1);
			}
			str5=str5 + ch1 + ch2;
			if (i==j-1 && str3=='0' ){
				str5=str5 + '整';
			}
		}
		if (num==0){
			str5='零元整';
		}
		return str5;
	},
	//保留小数点位数
	toFixed : function(num , len){ 
		if(isNaN(len)||len==null){
			len = 0;
		} else{ 
			if(len<0){
				len = 0;
			}
		}
		return Math.round(num * Math.pow(10,len)) / Math.pow(10,len);
	},
	//格式化数字
	//符号说明：
	//0 表示补0 的数字占位
	//. 表示小数点
	//, 数字分组符号 如123,456.123
	//# 表示不补0 的数字占位
	//
	//Number                  Pattern     Result
	//10000000000001124       #,###.###   10,000,000,000,001,124.000
	//123.125                 ##,#.#,#    1,2,3.1,3
	//123.125                 ###.#       123.1
	//123.125                 00000       00123
	//123.125                 .000        .125
	//0.125                   0.0000      0.1250
	//0.125                   00.0000     00.1250
	//
	//使用代码:
	//var numberText = dowell.number.formatNumber("##.##",123.456)//output 123.46
	formatNumber : function(pattern,data){
		if('number' == typeof data){
			//hack:purePattern as floatPurePattern
			function trim(data,pattern,purePattern){
				if(pattern){
					if(purePattern){
						if(purePattern.charAt() == '0'){
							data = data + purePattern.substr(data.length);
						}
						if(purePattern!=pattern){
							var pattern = new RegExp("(\\d{"+pattern.search(/[^\d#]/)+"})(\\d)");
							while(data.length < (data = data.replace(pattern,'$1,$2')).length);
						}
						data = '.' + data
					}else{
						var purePattern = pattern.replace(/[^\d#]/g,'');
						if(purePattern.charAt() == '0'){
							data = purePattern.substr(data.length) + data;
						}
						if(purePattern!=pattern){
							var pattern = new RegExp("(\\d)(\\d{"+(pattern.length-pattern.search(/[^\d#]/)-1)+"})\\b");
							while(data.length < (data = data.replace(pattern,'$1,$2')).length);
						}
					} //end of  if(purePattern){
					return data;
				}else{
					return '';
				}//end of    if(pattern){
			} //end of trim()
			return pattern.replace(/([#0,]*)?(?:\.([#0,]+))?/,function(param,intPattern,floatPattern){
				var floatPurePattern = floatPattern.replace(/[^\d#]/g,'');
				data = data.toFixed(floatPurePattern.length).split('.');
				return trim(data[0] ,intPattern) + trim(data[1] || '',floatPattern,floatPurePattern);
			})
		}else{
			 return "你输入的不是数字！";
		}
	},
	//四舍五入：
	//Dight 为要转换的数据
	//How  要保留的小数位数
	forDight : function(Dight,How) {
		Dight = Math.round(Dight*Math.pow(10,How))/Math.pow(10,How); 
		return Dight; 
	}
}

//函数操作空间
dowell.namespace("func");
dowell.func={
    //版本号
    version : "1.0",
	// 加载多个函数.
	// addLoadEvent(func_a);
	// addLoadEvent(func_b);
	addLoadEvent : 	function(func) {
			  var oldonload = window.onload;
			  if (typeof window.onload != 'function') {
				window.onload = func;
			  } else {  
				window.onload = function() {
				  oldonload();
				  func();
				}
			  }
		},
	// func函数在t毫秒延时后执行
	runAfter : function(func , t){
		var B = Array.prototype.slice.call(arguments,1);
		var f = function(){
			func.apply(null, B);
		};
		return setTimeout(f , t);
	},
	// 函数每隔t毫秒执行一次
	runEach : function(func , t){
		var B = Array.prototype.slice.call(arguments,1);
		var f = function(){
			func.apply(null,B);
		};
		return setInterval(f, t);
	},
	//函数每隔t毫秒执行，总执行n次
	runNum : function(func , t , n){
		var A = func;
		var B = Array.prototype.slice.call(arguments,2);
		var f = function(){
			A.apply(null, B);
		};
		if(t==0){
			f();return;
		};
		if(n<1){
			return;
		};
		for (i=1;i<=n;i++){
			setTimeout(f,t*i);
		};
	}
}


//对象操作空间
dowell.namespace("obj");
dowell.obj={
    //版本号
    version : "1.0",
    //把一个 OBJECT合并到当前object同名的元素覆盖,不同的就增加
    //var aa = {"r":"111"};
	//var cc = {"d":"222"};
	//var dd = extend(aa,cc);
	//for(var item in dd){
	//   alert(  dd[item]  ) 
	//}
	extend : function(obj,prop) {   
		// 防止传入错误的参数prop；   
		if( prop === null || prop == undefined)   
			return obj;   
		// 如果prop为空，则将obj扩展到自己身上，jQuery.js中大部分都是为空；   
		if( !prop ) {   
			return obj;
		}   
		// 将prop的所有属性复制到obj；   
		for (var i in prop )   
		obj[ i ] = prop[ i ];   
		return obj;   
	},
	//判断两个object的值是不是相同
	compare : function(obj1,obj2){
		for(elements   in   obj1){   
			if(obj1[elements]   !=   obj2[elements])   
		return   false   
		}   
		return   true  
	}
}


//日期操作空间
dowell.namespace("date");
dowell.date={
    // 版本号
    version : "1.0",
	// 在网页中显示 年  月 日  星期几.
	showDate : function(){
		var day="";
		var month="";
		var ampm="";
		var ampmhour="";
		var myweekday="";
		var year="";
		mydate=new Date();
		myweekday=mydate.getDay();
		mymonth=mydate.getMonth()+1;
		myday= mydate.getDate();
		myyear= mydate.getYear();
		year=(myyear > 200) ? myyear : 1900 + myyear;
		if(myweekday == 0)
		weekday=" 星期日 ";
		else if(myweekday == 1)
		weekday=" 星期一 ";
		else if(myweekday == 2)
		weekday=" 星期二 ";
		else if(myweekday == 3)
		weekday=" 星期三 ";
		else if(myweekday == 4)
		weekday=" 星期四 ";
		else if(myweekday == 5)
		weekday=" 星期五 ";
		else if(myweekday == 6)
		weekday=" 星期六 ";
		return year+"年"+mymonth+"月"+myday+"日 "+weekday
	},
	//格式化日期格式
	//var dates = format( new Date() , "yyyy-MM-DD hh:mm:ss");
	format : function(date , formatStr){ 
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
	},
	//日期比较
	compare : function(oldDate  , newDate) { 
		if(typeof(newDate)!="object" && newDate.constructor != Date){
			return -2; 
		}
		var d = oldDate.getTime() - newDate.getTime();
		if(d>0){
			return 1;
		}else{
			if(d==0){
				return 0;
			}else {
				return -1;
			}
		}
	},
	//针对不同的时间单位做加运算，得到日期年月日等加数字后的日期
	dateAdd : function( date , interval , number) {
		switch(interval) {
		case "y" : 
			date.setFullYear(date.getFullYear()+number); 
			return date; 
		case "q" : 
			date.setMonth(date.getMonth()+number*3);
			return date; 
		case "m" : 
			date.setMonth(date.getMonth()+number);
			return date; 
		case "w" : 
			date.setDate(date.getDate()+number*7);
			return date; 
		case "d" : 
			date.setDate(date.getDate()+number);
			return date; 
		case "h" : 
			date.setHours(date.getHours()+number);
			return date; 
		case "m" : 
			date.setMinutes(date.getMinutes()+number); 
			return date; 
		case "s" : 
			date.setSeconds(date.getSeconds()+number);
			return date; 
		default : 
			date.setDate(d.getDate()+number);
			return date; 
		}
	},
	//判断一个数字是否闰年
	isLeapYear : function(iYear) { 
		if(iYear+"" == "undefined" || iYear+""== "null" || iYear+"" == "") {
			return false;
		} 
		iYear = parseInt(iYear); 
		if((iYear % 4 == 0 && iYear % 100 != 0) || iYear % 400 == 0){
			return true
		}else{
			return false
		}; 
	},
	//获取某年某个月的天数
	monthDays : function(iYear,iMonth){
		iYear = parseInt(iYear); 
		iMonth = parseInt(iMonth); 
		var iDay = 31;
		if((iMonth==4||iMonth==6||iMonth==9||iMonth==11)&&iDay == 31){
			iDay=30;
			}
		if(iMonth==2 ){
			if(isLeapYear(iYear)){
				iDay = 29;
			}else {
				iDay = 28;
			}
		}
		return iDay;
	},
	//   计算日期为当年的第几周     
	//   获取   2008 7  5  为当年的第几周     
	//   返回:  28     
     weekOfYear : function(year,   month,   day){     
		  //   year       年     
		  //   month     月     
		  //   day         日     
		  //   每周从周日开始     
		  var   date1   =   new   Date(year,   0,   1);     
		  var   date2   =   new   Date(year,   month-1,   day,   1);     
		  var   dayMS   =   24*60*60*1000;     
		  var   firstDay   =   (7-date1.getDay())*dayMS;     
		  var   weekMS   =   7*dayMS;     
		  date1   =   date1.getTime();     
		  date2   =   date2.getTime();     
		  return   Math.ceil((date2-date1-firstDay)/weekMS)+1;     
      },
	//   通过周数和星期计算日期  
	//   获取    2005   年第   37   周的周六的日期   。 (0-6,   0代表周日)       
	//   返回:   2005年9月10号     
	dateFromWeek : function(year,   week,   day){     
		  //   year       年     
		  //   week       周     
		  //   day         星期   (0-6,   0代表周日)     
		  var   date1   =   new   Date(year,   0,   1);     
		  var   dayMS   =   24*60*60*1000;     
		  var   firstDay   =   (7-date1.getDay())*dayMS;     
		  var   weekMS   =   (week-2)*7*dayMS;     
		  var   result   =   date1.getTime()+firstDay+weekMS+day*dayMS;     
		  date1.setTime(result);     
		  return   date1.toLocaleDateString();     
      }  
}



//验证操作空间
dowell.namespace("validate");
dowell.validate={
   //版本号
    version : "1.0",
	//返回字符串是否电子邮件
	isEmail :  function(str){
		return (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(str);
	},
	//返回字符串是否合法URL地址
	isUrl : function(str){
		return (/^(http|https|ftp):\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/).test(str);
	},
	//返回字符串是否http地址
	isHttp : function(str){
		return (/^(http|https|ftp):\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/).test(str);
	},
	/**************
	*判断字符中是否包含有 http:// 
	**************/
	urlcheck : function(str){
		var re;
		re=new RegExp("http://");
		return re.test(str.toLowerCase());	
	},
	//返回字符串是否整数,包含正整数和负整数 
	isIntegral : function(str){
		return (/^(-|\+)?(\d)*$/).test(str);
	},
	//返回字符串是否浮点数
	isFloat : function(str){
		return (/^(-)?(\d)*(\.)?(\d)*$/).test(str);
	},
	//返回字符串是否汉字
	isChinese : function(str){
		return (/^[u4e00-u9fa5],{0,}$/).test(str);
	},
	//返回字符串是否普通电话、传真号码
	isTelephone : function(str){
		return (/^((d{3,4})|d{3,4}-)?d{7,8}$/).test(str);
	},
	//返回字符串是否手机号
	isMobile : function(str){
		return (/^1(3|5)\d{9}$/).test(str);
	},
	//返回字符串是否匹配腾讯QQ号
	isQQ : function(str){
		return (/^[1-9][0-9]{4,10}$/).test(str);
	},
	//返回字符串是否匹配中国邮政编码
	isPostCode : function(str){
		return (/^(\d){6}$/).test(str);
	},
	//返回字符串是否匹配身份证
	isIdenCardID : function(str){
		return (/^(\d{15}|\d{17}[x0-9])$/).test(str);
	},
	//返回字符串是否匹配时间格式
	isTime : function(str){
		return (/^(\d+):(\d{1,2}):(\d{1,2})$/).test(str);
	},
	//返回字符串是否匹配日期验证
	isDatetime : function(str){
		if(Date.parse(str)||Date.parseDate(str)){
			return true;
		}else{
			return false;
		}
	},
	//返回字符串是否合法文件名
	isFileName : function(str){
		return (/[\\\/\*\?\|:"<>]/).test(str);
	},
	// 判断是否是ip
	isIp : function(str){
        return (/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/).test(str);
	},
 
	//判断输入是否是一个整数
	 isValidPositiveInteger : function(str){
		var result=str.match(/^(-|\+)?\d+$/);
		if(result==null) return false;
		return true;
	},
	//判断输入是否是一个正整数
	 isValidPositiveInteger : function(str){
		var result=str.match(/^\d+$/);
		if(result==null) return false;
		if(parseInt(str)>0) return true;
		return false;
	},
	//判断输入是否是一个负整数
	 isValidNegativeInteger : function(str){
		var result=str.match(/^-\d+$/);
		if(result==null) return false;
		return true;
	},
	 //判断输入是否是一个数字
	 isValidNumber : function(str){
		return !isNaN(str);
	}, 
	//判断输入是否是一个由 A-Z / a-z 组成的字符串
	 isValidLetters : function(str){
		var result=str.match(/^[a-zA-Z]+$/);
		if(result==null) return false;
		return true;
	 },
	 //判断输入是否是一个由 0-9 / A-Z / a-z 组成的字符串
	 isValidAlphanumeric : function(str){
		var result = str.match(/^[a-zA-Z0-9]+$/);
		if(result==null) return false;
		return true;
	 },
	 //判断输入是否是一个由 0-9 组成的数字
	isValidDigits : function(str){
		var result = str.match(/^[1-9][0-9]+$/);
		if(result==null) return false;
		return true;
	},
	//判断输入是否是一个由 0-9 / A-Z / a-z / . / _ 组成的字符串
	isValidString : function(str){
		var result=str.match(/^[a-zA-Z0-9\s.\-_]+$/);
		if(result==null) return false;
		return true;
	},
	//判断输入是否是有效的短日期格式 - "YYYY-MM-DD"
	isValidDate : function(str){
		var result=str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
		if(result==null) return false;
		var d=new Date(result[1], result[3]-1, result[4]);
		return (d.getFullYear()==result[1]&&d.getMonth()+1==result[3]&&d.getDate()==result[4]);
	},
 	//判断输入是否是有效的时间格式 - "HH:MM:SS"
	isValidTime : function(str){
		var resule=str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
		if (result==null) return false;
		if (result[1]>24 || result[3]>60 || result[4]>60) return false;
		return true;
	},
	//判断输入是否是有效的长日期格式 - "YYYY-MM-DD HH:MM:SS"
	isValidDatetime : function(str){
		var result=str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
		if(result==null) return false;
		var d= new Date(result[1], result[3]-1, result[4], result[5], result[6], result[7]);
		return (d.getFullYear()==result[1]&&(d.getMonth()+1)==result[3]&&d.getDate()==result[4]&&d.getHours()==result[5]&&d.getMinutes()==result[6]&&d.getSeconds()==result[7]);
	},
	/***************
	* 用于检验手机号的位数以及检验此手机中是否为中国移动的手机号
	* 如果还想判断联通的手机，可以改 GSMPhNo  。
	用法 ：
	<form name="toptransfer">
	<input type="text" name="phone" />
	<input type="button" value="test" onclick="checkFetionReg()"/>
	</form>
	function checkFetionReg(){ //例子
	   if(checkMBPhone(document.toptransfer.phone.value)){
				//do your things
	   }
	 }
	**************/
	checkMBPhone : function(phone){
		var GSMPhNo = /^(13[4-9])|(159)|(158)|(150)|(151)/; //以134(5、6、7、8、9)或159,158,151,150开头;
		var num11 = /^\d{11}$/; //11位数字;
		if( "" != phone ){
		  if(num11.exec(phone)){
			if(GSMPhNo.exec(phone)){
			  return true;
			}else{
			  alert("对不起，请您正确输入中国移动GSM手机号码(以134-139、159、158、151或150开头)!");
			  return false;
			}
		  }else{
			alert("请正确输入11位手机号码(数字)!");
			return false;
		  }
		}else{
		  alert("对不起，请输入您的手机号码!");
		  return false;
		}
	},
	//检查输入的值，小数点后的位数
	//用法：  checknumber(   '22.22'   ,   1  , "金额" );
	checknumber : function (value,num,str){
	  if(value!=""){
		   if(value.indexOf(".")>0){
				var temp=value.length-(value.indexOf(".")+1);
				if(temp>num){
					 alert(str+"的小数点后只能有"+num+"位！");
					 return true;
				}
		   }
	  }
	  return false;
	},
	/*
	 *由于firefox在返回一个元素的color的时候往往是返回一个字符串比如rgb(255, 255, 255)
	 *而IE往往返回#FFFFFF这种形式，在有时候做颜色判断时很难做比较，于是我便写了这个函数
	 *方便从一个含有三个颜色值的字符串转换为一个Hex的颜色值
	 */
	hexColor : function(){
		if(this.indexOf("#") >= 0) return this;
		var pattern = new RegExp("2[0-4]\\d|25[0-5]|[01]?\\d\\d?","ig");//匹配0到255的数字
		var va = this.match(pattern);
		if(va.length != 3) return "NaN";//如果匹配数量不为3个，则说明字符串内的值有问题返回NaN
		var result = "#";
		for(var i = 0; i < 3; i++) {
			var num = parseInt(va[i]);
			result += num < 16 ? "0" + num.toString(16) : num.toString(16);//对小于F的值补0
		}
		return result;
	}

}


 

 
//Ajax操作空间
dowell.namespace("ajax");
dowell.ajax={
   //版本号
    version : "1.0",
    //动态加载js脚本
    loadScript : function(url, callback){
		var script = document.createElement("script");        
		script.type = "text/javascript";  
		if (script.readyState){  //IE   
	    	script.onreadystatechange = function(){          
	    		if (script.readyState == "loaded"||script.readyState == "complete"){
	    			script.onreadystatechange = null;
	    			if(typeof callback == 'function') callback();
	    		}
	    	}
	    }else{ //others
	    	script.onload = function(){ 
	    		if(typeof callback == 'function') callback();
	    	}
	    }
	    script.src = url;
	    document.getElementsByTagName("head")[0].appendChild(script);
	},
	//获取json的长度
	getJsonLength : function(jsonData){
		var jsonLength = 0;
		for(var item in jsonData) {
				jsonLength++;
		}
		return jsonLength;
	},
	//手动加载js,css
	//用法：dowell.ajax.loadobjs('style.css', 'tip.js'...);
	loadobjs : function(){
		var loadedobjects=""
		if (!document.getElementById)
			return
			for (i=0; i<arguments.length; i++){
			var file=arguments[i]
			var fileref=""
			if (loadedobjects.indexOf(file)==-1){ //检查看看这个对象是否添加到页之前
				if (file.indexOf(".js")!=-1){ //如果是js文件
				fileref=document.createElement('script')
				fileref.setAttribute("type","text/javascript");
				fileref.setAttribute("src", file);
				}
				else if (file.indexOf(".css")!=-1){ //如果是css文件
				fileref=document.createElement("link")
				fileref.setAttribute("rel", "stylesheet");
				fileref.setAttribute("type", "text/css");
				fileref.setAttribute("href", file);
				}
			}
			if (fileref!=""){
				document.getElementsByTagName("head").item(0).appendChild(fileref)
				loadedobjects+=file+" " // 记住对象已经被添加到网页
			}
		}
	},
	// 得到url参数值
	// url: http:www.cssrain.cn/article.asp?id=100
	// var id = dowell.ajax.getParameter("id");
	// alert(id);
	getParameter : function(key)
	{
		var parameters = unescape(window.location.search.substr(1)).split("&");
		for( var i = 0 ; i < parameters.length ; i++ )
		{
			var paramCell = parameters[i].split("=");
			if( paramCell.length == 2 && paramCell[0].toUpperCase() == key.toUpperCase() )
			{
				return paramCell[1];
			}
		}
		return new String();
	},
	//获取上一页的来源是否来自cssrain.cn
	//注意此方法在本地上测试是为空。必须放到服务器上，才有用。
	check_referrer : function(){
		   var url=document.referrer; //document.referrer是上一页的来源
		   var p=url.toLowerCase().indexOf("cssrain.cn");
		   if(p>=0){
			   return true;
		   }else{
			   return false;
		   }
		   return false;
	},
  /**
    加载XML数据。
    解析方法：
	var oxml= dowell.ajax.loadXML("CssRain.xml");
    var users = oxml.getElementsByTagName("users");
    for(var i=0;i<users.length;i++) {
            var e = users[i];
			var id = e.getElementsByTagName("id")[0].firstChild.data;
			var title = e.getElementsByTagName("id")[0].getAttribute("title");
			alert( id );
			alert( title );
	}
  **/
	loadXML : function(xmlpath){
		var xmlDoc=null;
		if (window.ActiveXObject){
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		}else if (document.implementation && document.implementation.createDocument){
			xmlDoc=document.implementation.createDocument("","",null);
		}else{
			alert('Your browser cannot handle this script.');
		}
		xmlDoc.async=false;
		xmlDoc.load(xmlpath);
		return xmlDoc;
	},
	/**************
	从URL地址中提取文件名
	*用法：
	var a =dowell.ajax.url_filename("http://www.cssrain.cn/abc.rar");
	alert( a  ) ;// "abc"
	**************/
	url_filename : function (string){
		string=string.replace(/(.*\/){0,}([^\.]+).*/ig,"$2")
		return string
	},
	/***************
	获取域名.
	**************/
	getDomainName : function(){
	  var s,siteUrl;
	  s=document.location+"";
	  return s.substring(7,s.indexOf('/',7));
	},
	//获取地址中的参数name 的值，第2个参数为空时表示当前页面的地址
	//alert(  dowell.ajax.getQuery("username","http://www.cssrain.cn?username=1111&password=2222")  );  
	getQuery : function (name,url){
		var u  = arguments[1] || window.location.href;
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = u.substr(u.indexOf("\?")+1).match(reg);
		if (r!=null) {
			return unescape(r[2]);
		} 
		return "";
	},
	//获取一个路径中文件扩展名(后缀名)
	//	alert(   dowell.ajax.getExtName("http://www.cssrain.cn?username.rar")  );  
	getExtName : function(url){
		if (!/\./.test(url)) return ""; 
		var arr=url.split(".");
		return arr[arr.length-1].toLowerCase();
	}
    //创建用于ajax技术的 XMLHttpRequest对象。
}


//常用表单操作空间
dowell.namespace("form");
dowell.form={
    //版本号
    version : "1.0",
	//  得到选中的多选框值的Array
	//	var get_a =  getCheckBoxArray( document.getElementsByName("checkboxName") );
    //  alert(get_a +  " |  "  + get_a[1] )
	getCheckBoxArray : function(element){
		var values = new Array();
		if(null == element){
			//alert("no data!");
		}else if(null == element.length){
			if(element.checked){
				values.push(element.value);
			}
		}else{
			for(i=0; i<element.length; i++){
				if(element[i].checked){
					 values.push(element[i].value);
				}
			}
		}
		return values;
	},
	//得到Form里的数据，以 “&” 号 拼接起来。
	//在ajax传递数据中，经常用到这个方法。
	//参数“formN”为表单的name值。
	formdata : function(formN){
		var str=""
		for(i=0;i<document.forms[formN].elements.length;i++){
		 if(document.forms[formN].elements[i].type!="button"){//这里可以根据需求，来判断那些类型不要
		   var e = document.forms[formN].elements[i];
		   str+=e.name+"="+e.value+"&"
		  }
		}
		str=str+"date="+new Date().getTime(); //拼接一个变量，解决缓存问题
		return str;
	},
	/**************
	 * 得到单选框选中的值。
	 * 用法：
	 *<input type="radio"  value="1" name="cssrain"/>
	 *<input type="radio"  value="2" name="cssrain" checked/>
	 *<input type="radio"  value="3" name="cssrain"/>
	 *<input type="button" onclick="alert(dowell.form.getRadioValue('cssrain'))" value="test"/>
	**************/
	getRadioValue : function(radioName){
		var obj=document.getElementsByName(radioName);
		for(var i=0;i<obj.length;i++){
			if(obj[i].checked){
				return obj[i].value;
			}
		}
	},
	/**************
	 * 复选框全选/不选/反选
	 * 用法：
	<form id="form_a">
	<input type="checkbox"  value="1" name="a"/>
	<input type="checkbox"  value="2" name="a" checked/>
	<input type="checkbox"  value="3" name="a"/>
	<input type="button" value="全选" onclick="dowell.form.checkAll(document.getElementById('form_a'),'all')"/>
	<input type="button" value="不选" onclick="dowell.form.checkAll(document.getElementById('form_a'),'none')"/>
	<input type="button" value="反选" onclick="dowell.form.checkAll(document.getElementById('form_a'),'')"/>
	</form>
	**************/
	checkAll : function(form, sel){
		for (i = 0, n = form.elements.length; i < n; i++) {
			if(form.elements[i].type == "checkbox") {
				if(form.elements[i].checked == true) {
					form.elements[i].checked = (sel == "all" ? true : false);
				} else {
					form.elements[i].checked = (sel == "none" ? false : true);
				}
			}
		}
	},
	/**************
	 * 复选框检查是否选中。
	 * 如果没一个选中，会返回false.
	 * 用法：
	 <form id="form_a" name="form_a">
	 <input type="checkbox"  value="1" name="a"/>
	 <input type="checkbox"  value="2" name="a" checked/>
	 <input type="checkbox"  value="3" name="a"/>
	 <input type="button" value="全选" onclick="alert( dowell.form.isChecked('form_a','a') )"/>
	 </form>
	**************/
	isChecked : function(_formName,_checkboxName){
		var selflag = {'checked':0,'cvalues':[]};
		_scheckbox = eval('document.'+_formName+'.'+_checkboxName);
		if(_scheckbox){
			if(eval(_scheckbox.length)){
				for(i=0;i<_scheckbox.length;i++){
					if(_scheckbox[i].checked){
						selflag.checked++;
						selflag.cvalues.push(_scheckbox[i].value);
					}
				};
			}else if(_scheckbox.checked){
				selflag.checked++;
				selflag.cvalues.push(_scheckbox.value);
			}
			if(selflag.checked){
				return selflag;
			}
		}
		return false;
	},
	/**************
	函数 ： 文本框得到与失去焦点 操作。
	这个方法经常在文本框搜索的时候出现。
	文本里显示 “ 搜索 ”，然后当用户鼠标点击此文本，
	文本框内容清空。如果用户没填写内容，那么文本的值又复原。
	如果填写了，就显示用户填写的。
	 用法:
	 <input type="" value="关键字搜索" name="a" onfocus="dowell.form.clearTxt('a','关键字搜索')" onblur="dowell.form.fillTxt('a','关键字搜索')"/>
	<input type="text" value="test" name="test" />
	**************/
	clearTxt : function(id,txt) {
	  if (document.getElementById(id).value == txt)
		document.getElementById(id).value="" ;
	  return ;
	},
	fillTxt : function(id,txt) {
	  if ( document.getElementById(id).value == "" )
		document.getElementById(id).value=txt;
	  return ;
	},
	/**
	改变下拉框选项后，根据选项的不同弹出不同的窗口.
	用法:
	<select onchange="return dowell.form.selectPop(this);" >
	<option  selected="selected">--分公司--</option>
	<option value="http://www.cssrain.cn">CssRain</option>
	<option value="http://www.sh.chinaunicom.com">上海</option>
	</select> 
	**/
	selectPop : function(fileurl){
		if (fileurl.options[fileurl.selectedIndex].value != ""){
				window.open(fileurl.options[fileurl.selectedIndex].value,"_blank","toolbar=yes,location=yes,menubar=yes,scrollbars=yes,resizable=yes,left=50,height=500,width=700");
			}
		return true;
    },
	/**************
	文本框输入字符控制。
	只能输入数字。
	用法:
	<input onkeyup="dowell.form.input_shuzi(this)" onbeforepaste="dowell.form.input_shuzi_before()" />
	**************/
	input_shuzi : function(obj){
		obj.value=obj.value.replace(/[^\d]/g,'');
	},
	input_shuzi_before: function(){
		clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''));
	},
	/**************
	文本框输入字符控制。
	只能输入数字和英文。
	用法:
	<input onkeyup="dowell.form.input_shuziyinwen(this)" onbeforepaste="dowell.form.input_shuziyinwen_before()" />
	**************/
	input_shuziyinwen : function(obj){
		obj.value=obj.value.replace(/[\W]/g,'');
	},
	input_shuziyinwen_before : function(){
		clipboardData.setData('text',clipboardData.getData('text').replace(/[\W]/g,''));
	},
	/**************
	文本框输入字符控制。
	只能输入汉字。
	用法:
	<input onkeyup="dowell.form.input_hanzi(this)" onbeforepaste="dowell.form.input_hanzi_before()" />
	**************/
	input_hanzi : function(obj){
		obj.value=obj.value.replace(/[^\u4E00-\u9FA5]/g,'');
	},
	input_hanzi_before : function(){
		clipboardData.setData('text',clipboardData.getData('text').replace(/[^\u4E00-\u9FA5]/g,''));
	},
	/**************
	文本框输入字符控制。
	只能输入全角。
	用法:
	<input onkeyup="dowell.form.input_quanjiao(this)" onbeforepaste="dowell.form.input_quanjiao_before()" />
	**************/
	input_quanjiao : function(obj){
		obj.value=obj.value.replace(/[^\uFF00-\uFFFF]/g,'');
	},
	input_quanjiao_before : function(){
		clipboardData.setData('text',clipboardData.getData('text').replace(/[^\uFF00-\uFFFF]/g,''));
	},
	/**************
	*只允许输入数字和小数点。
	*用法：
	*<input type=text  onkeyup="dowell.form.clearNoNum(this)"/>
	**************/
	clearNoNum : function(obj){
		//先把非数字的都替换掉，除了数字和.
		obj.value = obj.value.replace(/[^\d.]/g,"");
		//必须保证第一个为数字而不是.
		obj.value = obj.value.replace(/^\./g,"");
		//保证只有出现一个.而没有多个.
		obj.value = obj.value.replace(/\.{2,}/g,".");
		//保证.只出现一次，而不能出现两次以上
		obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
	},
	/**************
	*把输入的字母转成大写。
	*用法：
	*<input type="text"  name="d" onkeyup="dowell.form.input_to_uppercase(this)" />
	**************/
	input_to_uppercase : function(obj){
		obj.value=obj.value.toUpperCase();
	},
	/**************
	*把输入的字母转成小写。
	*用法：
	*<input type="text"  name="e" onkeyup="dowell.form.input_to_lowercase(this)" /> 
	**************/
	input_to_lowercase : function(obj){
		obj.value=obj.value.toLowerCase();
	},
	/**************
	*实时检测输入框的字数
	*用法：
	 <input type="text" name="explain" id="explain" onkeyup="dowell.form.checkInputLength(20 , this ,'tarId')" >
	 <small>文字最大长度: 20. 还剩: <span id="tarId">20</span>.</small>
	**************/
	checkInputLength : function(len , which , targetId){
		var maxChars = len;
		if (which.value.length > maxChars){
			which.value = which.value.substring(0,maxChars);
		}
		var curr = maxChars - which.value.length;
		document.getElementById(targetId).innerHTML = curr.toString();
	}
}



//用户界面操作空间
dowell.namespace("ui");
dowell.ui={
   //版本号
    version : "1.0",
	/**************
	收藏到书签.(兼容IE和FF)。
	用法:
	<input type="button" value="收藏" onclick="dowell.ui.addBookmark('CssRain(前端开发)','http://www.cssrain.cn')"/> 
	**************/
	addBookmark : function(title,url) {
		if (window.sidebar) {
			window.sidebar.addPanel(title, url,"");
		} else if( document.all ) {
			window.external.AddFavorite( url, title);
		} else if( window.opera && window.print ) {
			return true;
		}
	},
	//控制图片加载后的大小
	//<img src="http://www.cssrain.cn/demo/JQuery+API/logo-json.gif" onload="proDownImage(this);"/>
	proDownImage : function(ImgD){
		var proMaxHeight = 40;
		var proMaxWidth  = 120;
		var image=new Image();
		image.src=ImgD.src;
		if(image.width>0 && image.height>0){
			var rate = (proMaxWidth/image.width < proMaxHeight/image.height)?proMaxWidth/image.width:proMaxHeight/image.height;
		   //如果 指定高度/图片高度  小于  指定宽度/图片宽度 ，  那么，我们的比例数 取 指定高度/图片高度。
		   //如果 指定高度/图片高度  大于  指定宽度/图片宽度 ，  那么，我们的比例数 取 指定宽度/图片宽度。
			if(rate <= 1){   
				   ImgD.width = image.width*rate;   //图片新的宽度 = 宽度 * 比例数
				   ImgD.height =image.height*rate;
			}else{	//  如果比例数大于1，则新的宽度等于以前的宽度。
				   ImgD.width = image.width;
				   ImgD.height =image.height;
			}
		 }
	},
	/**************
	拷贝/复制文本框内容。（ 兼容IE7 和 FF2 ）
	用法:
	1，<input type="text"  name="d" id="d" value="&lt;http://www.cssrain.cn&gt;&lt;http://www.cssrain.cn&gt;" /><input id="Button1" type="button" onclick="dowell.ui.copyText(document.getElementById('d'));" value="复制" />  <br/>
	2，<textarea name="c"  id="c" rows="4" cols="20">&lt;http://www.cssrain.cn&gt;</textarea>
	<input id="Button2" type="button" onclick="dowell.ui.copyText(document.getElementById('c'));" value="复制" />
	**************/
	copyText : function (obj){
		if( obj.type !="hidden" ){
			obj.focus();
		}
		obj.select(); 
		dowell.ui.copyToClipboard(obj.value);
		alert("拷贝成功！");
	},
	copyToClipboard : function (txt) {  
		if(window.clipboardData)  {  
			window.clipboardData.clearData();  
			window.clipboardData.setData("Text", txt);  
		}  
		else if(navigator.userAgent.indexOf("Opera") != -1)  
		{  
			window.location = txt;  
		}  
		else if (window.netscape)  
		{  
			try {  
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
			}  
			catch (e)  
			{  
				alert("您使用的浏览器不支持此复制功能，请使用ctrl+c或者浏览器右键复制");  
			}  
			var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);  
			if (!clip)  
				return;  
			var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);  
			if (!trans)  
				return;  
			trans.addDataFlavor('text/unicode');  
			var str = new Object();  
			var len = new Object();  
			var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);  
			var copytext = txt;  
			str.data = copytext;  
			trans.setTransferData("text/unicode",str,copytext.length*2);  
			var clipid = Components.interfaces.nsIClipboard;  
			if (!clip)  
				return false;  
			clip.setData(trans,null,clipid.kGlobalClipboard);  
		}  
		return true;  
	},
	//运行代码
	//用法：
	//<textarea id="a">aaaaaaaa</textarea>
	 //<input type="button" value="运行" onclick="dowell.ui.runCode('a')" />
	runCode : function(cod1)  {
		  cod=document.getElementById(cod1)
		  var code=cod.value;
		  if (code!=""){
			  var newwin=window.open('','','');  
			  newwin.opener = null 
			  newwin.document.write(code);  
			  newwin.document.close();
		}
	},
	/*
	插入Flash文件
	在你要插入的位置 。
	  document.write( dowell.ui.GetFlashStr("pro.swf","400px","100px",true) );
	*/
	GetFlashStr : function (Path,Width,Height,Transparent){
		 var Temp,T="";
		 Temp='<object classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" id="FlashH" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" border="0" width="'+Width+'" height="'+Height+'">'
		 Temp+='<param name="movie" value="'+Path+'"/>'
		 Temp+='<param name="quality" value="High"/>'
		 Temp+='<param name="scale" value="ExactFit"/>'
		 if (Transparent) {Temp+=' <param name="wmode" value="transparent"/>';T='wmode="transparent"'}
		 Temp+='<embed src="'+Path+'" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" name="FlashH" width="'+Width+'" height="'+Height+'" quality="High"'+T+' scale="ExactFit"/>'
		 Temp+='</object>'
		 return Temp;
	},
	/**************
	显示/隐藏内容。
	用法:
	<img src="images/close.gif" id="img_a" onClick="dowell.ui.show_hide_display(table_a,img_a)">
	<table id="table_a">
	<tr>
	<td>aaa</td>
	</tr>
	</table>
	**************/
	show_hide_display : function (t_id,i_id){//显示/隐藏
		var t_id;//表格ID
		var i_id;//图片ID
		var default_img="images/close.gif";//默认图片
		var on_img="images/close.gif";//打开时图片
		var off_img="images/open.gif";//隐藏时图片
		if (t_id.style.display == "none") {//如果为隐藏状态
		t_id.style.display="";//切换为显示状态
		i_id.src=on_img;}//换图
		else{//否则
		t_id.style.display="none";//切换为隐藏状态
		i_id.src=off_img;}//换图
	}
}



//事件操作空间
dowell.namespace("event");
dowell.event={
	//版本号
    version : "1.0",
	/**************
	函数 ：触发某个对象的onclick事件。（兼容IE和FF）
	用法: 
	<input type="button" value="aaa" id="a" onclick=" alert('cssrain') " />
	<input type="button" value="触发ID为a的onclick事件" onclick=" dowell.event.handerToClick('a') " />
	**************/
	handerToClick : function(objid){
		var obj=document.getElementById(objid);
		if(document.all){
			obj.fireEvent("onclick");
		}else{
			var e=document.createEvent('MouseEvent');
			e.initEvent('click',false,false);
			obj.dispatchEvent(e);
		}
	},
	/**************
	函数 ： 用来判断鼠标按的是左键还是右键。(兼容IE和ff)
	用法:
	onmousedown="dowell.form.mouseKeycode(event)"
	**************/
	mouseKeycode : function(event){
			var event=event||window.event;
			var nav=window.navigator.userAgent;
			if (nav.indexOf("MSIE")>=1) //如果浏览器为IE.解释：因为 document.all 是 IE 的特有属性，所以通常用这个方法来判断客户端是否是IE浏览器 ,document.all?1:0; 
		  { 
		   if(event.button==1){alert("左键");}
		   else if(event.button==2){alert("右键");}
		  }
		  else if(nav.indexOf("Firefox")>=1) ////如果浏览器为Firefox 
		  {
		   if(event.button==0){alert("左键");}
		   else if(event.button==2){alert("右键");}
		  }
		   else{ //如果浏览器为其他 
			alert("other");
		   } 
	},
	/**************
	回车提交。
	用法:
	<input   type=text   onkeydown="dowell.form.keysubmit()">   
	**************/
	keysubmit : function(){
		if(event.keyCode==13){
		     form.submit();
	   }
	},
	/**************
	实现Ctrl+Enter 提交的效果.(兼容IE和FF)
	在做这个效果时，发现一个问题，
	当表单中如果只有一个文本框时，
	回车会默认提交。(没有提交按钮也一样。)
	用法:
	<form action="#"  name="a">
	<input   type="text" />   
	<input   type="text"   onkeydown="dowell.form.QuickPost( event , document.a )" />   
	</form>
	**************/
	QuickPost : function(event,form){
		var event=event||window.event;
		if((event.ctrlKey && event.keyCode == 13)||(event.altKey && event.keyCode == 83)){
		//	event.srcElement.form.submit();
		  form.submit();
		}
	},
	/**************
	回车自动跳到下一个文本框。注;此方法不兼容FF，
	因为在FF下，event.keycode是只读属性，不能赋值。
	用法:
	<form action="#"  name="a" onkeydown="dowell.form.QuickNext()">
	<input   type="text" />   
	<input   type="text"   />   
	<input   type="button" value="test"  />  
	</form>
	**************/
	QuickNext : function(){  
	  //判断是否为button, 是因为在HTML上会有type="button"
	  //判断是否为submit,是因为HTML上会有type="submit"
	  //判断是否为reset,是因为HTML上的"重置"应该要被执行
	  //判断是否为空,是因为对于HTML上的"<a>链接"也应该被执行,
	  //这种情况发生的情况不多,可以使用"tabindex=-1"的方式来取消链接获得焦点.
		  if(event.keyCode==13 && event.srcElement.type!='button' && event.srcElement.type!='submit' && event.srcElement.type!='reset' && event.srcElement.type!='textarea' && event.srcElement.type!='') 
			   {   event.keyCode = 9; }
	 },
	 /**************
	按TAB键移动到下一个输入框时，光标停在文本框文字的最后，方便用户继续输入.
	注：IE默认是全部选中。此方法不兼容FF。
	用法:
	 <input type='text' value='0592' onfocus="dowell.form.moveEnd()"> 
	**************/
	moveEnd : function(){
		var e=event.srcElement;
		var r=e.createTextRange();
		r.moveStart('character',e.value.length);
		r.collapse(true);
		r.select();
	},
	//js触发链接
	doClick: function(aId /* 链接的id */ ){
		if(document.all){ 
			document.getElementById(aId).click(); 
		}else{ 
			var evt = document.createEvent("MouseEvents"); 
			evt.initEvent("click", true, true); 
			document.getElementById(aId).dispatchEvent(evt); 
		}
	}

}



//帮助操作空间
dowell.namespace("help");
dowell.help={
   //版本号
    version : "1.0" ,
	author : "cssrain",
	blog : "http://www.cssrain.cn",
	email : "cssrain@gmail.com",
	about : "none"
}




/** ---------------------------------华丽分割线-------------------------------*/
/* 其他常用函数 */
/**************
*双击鼠标滚动屏幕的代码.(兼容IE和FF)
*用法:直接嵌入js，就可以用了。
**************/
var scroll_currentpos,scroll_timer;
function scroll_initialize(){
	scroll_timer=setInterval ("scrollwindow ()",30);
}
function scroll_sc(){
	clearInterval(scroll_timer);
}
function scrollwindow(){
	scroll_currentpos=document.body.scrollTop;
	window.scroll(0,++scroll_currentpos);
	if (scroll_currentpos !=document.body.scrollTop)
	scroll_sc();
}
document.onmousedown=scroll_sc
document.ondblclick=scroll_initialize

/**************
网页中常用的iframe分割.
经常我们看到由左，分割线，和右3部分组成的网站。
其实不难，分割线也是一个iframe,然后在里面写入下面的脚本 就可以了。
用法：
http://www.cssrain.cn/demo/2/iframe/iframe.rar
**************/
function switchSysBar(){
 if (parent.document.getElementById('attachucp').cols=="160,10,*"){
 document.getElementById('leftbar').style.display="";
 parent.document.getElementById('attachucp').cols="0,10,*";
 }
 else{
 parent.document.getElementById('attachucp').cols="160,10,*";
 document.getElementById('leftbar').style.display="none"
 }
}
function c_load(){
 if (parent.document.getElementById('attachucp').cols=="0,10,*"){
 document.getElementById('leftbar').style.display="";
 }
}
/***************
Cookie操作：
判断cookie是否开启
返回 boolean类型
**************/
function open_cookie(){
	 //判断cookie是否开启
    var cookieEnabled=(navigator.cookieEnabled)? true : false;
    //如果浏览器不是ie4+或ns6+
    if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled){
        document.cookie="testcookie";
        cookieEnabled=(document.cookie=="testcookie")? true : falsedocument.cookie="";
    }
	
    if(cookieEnabled){
        return true;
    }else{
        return false;
    }
}
//增加Cookie
function createCookie(name, value, days) {   
    var expires = '';   
    if (days) {   
        var date = new Date();   
        date.setTime(date.getTime() + (days*24*60*60*1000));   
        var expires = '; expires=' + date.toGMTString();   
    }   
    document.cookie = name + '=' + value + expires + '; path=/';   
}   
//获取Cookie值
function readCookie(name) {   
    var cookieCrumbs = document.cookie.split(';');   
    var nameToFind = name + '=';   
    for (var i = 0; i < cookieCrumbs.length; i++) {   
        var crumb = cookieCrumbs[i];   
        while (crumb.charAt(0) == ' ') {   
            crumb = crumb.substring(1, crumb.length); /* delete spaces */  
        }   
        if (crumb.indexOf(nameToFind) == 0) {   
            return crumb.substring(nameToFind.length, crumb.length);   
        }   
    }   
    return null;   
}   
//删除Cookie
function eraseCookie(name) {   
    createCookie(name, '', -1);   
} 
 
/****
判断浏览器类型:
alert( bom.isIE );
alert( bom.isIE6 );
alert( bom.isIE7 );
alert( bom.isFireFox );
****/
var bom;
(function(){
	var E=navigator.userAgent.toLowerCase();
	var FF=E.indexOf("firefox")!=-1,B=E.indexOf("opera")!=-1,G=E.indexOf("safari")!=-1,A=!B&&!G&&E.indexOf("gecko")>-1,C=!B&&E.indexOf("msie")!=-1,F=!B&&E.indexOf("msie 6")!=-1,D=!B&&E.indexOf("msie 7")!=-1;
	bom ={
		isOpera:B,
		isSafari:G,
		isGecko:A,
		isIE:C,
		isIE6:F,
		isIE7:D,
		isFireFox : FF
	};
})();



/*==========================测试===================================*/
/*
// dom test 1 :
// alert( "a"+ dowell.dom.ById("rrr").innerHTML + "b" )

// dom test 2 :
var a = dowell.dom.ByClassName(document,"a","info-links");
// alert(a[0].innerHTML +"   "+a[1].innerHTML);
for(var i=0;i<a.length;i++){
	a[i].style.color="red";
}

var b =  dowell.dom.ByClassName(document.getElementById("container"), "div", "col");
for(var m=0;m<b.length;m++){
	b[m].style.color="red";
}

/* 
// help text 1 :
var  cr = "c     s  s  r  a   i n";
cr = dowell.string.replaceAll(cr , "s", "a");
alert(cr);
cr = dowell.string.replaceAll(cr , " ", "");
alert(cr);


dowell.func.addLoadEvent(t)
dowell.func.addLoadEvent(b)

dowell.dom.stripeTableById("cr" , "aa" ,"bb","cc");

var arr=["abc",85,"abc",85,8,8,1,2,5,4,7,8];
alert(  dowell.array.limit(arr,2,4)  );

var a= 3123.3252;
alert( dowell.number.toMoney(a) )

var numberText = dowell.number.formatNumber("##.##",123.456)//output 123.46

 
*/


function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
	if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}

/*  http://www.openjs.com/scripts/dom/class_manipulation.php */


//获取兄弟元素
function getChildren(n, skipMe){
    var r = [];
    var elem = null;
    for ( ; n; n = n.nextSibling ) 
       if ( n.nodeType == 1 && n != skipMe)
          r.push( n );        
    return r;
};

function getSiblings(n) {
    return getChildren(n.parentNode.firstChild, n);
}
