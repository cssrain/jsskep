﻿/*
此项目由cssrain发起，群里的朋友完善。
收集了项目中常用的js函数和封装代码。
为项目提供方便。希望能在项目中发挥作用。
v2.4  2008.08.12
如果你也有好的函数和封装代码,可以给我联系.
email : cssrain@gmail.com
一起完善这个js。
*/

/**************
简化document.getElementById
用法：
$id("d").innerHTML; 
(HTMLcode:<div id="d">cssrain</div>)
**************/
function $id(id) {
	return document.getElementById(id);
}

/**************
函数：getElementsByClassName
使用方法：
获取document内的超链接class是“info-links”的。
getElementsByClassName(document, "a", "info-links");
获取container内的div的class是col的.
getElementsByClassName(document.getElementById("container"), "div", "col"); 
获取document内的所有class是“click-me”的。
getElementsByClassName(document, "*", "click-me");
例子：
HTML code:
<a class="a">ccc</a>
<a class="info-links">aaa</a>
<a class="info-links">bbb</a>
<br/><br/>
<div class="co">dddd</div>
<div class="col">dddd</div>
<div id="container">
<div class="co">dddd</div>
<div class="col">dddd</div>
<div class="co">dddd</div>
<div class="col">dddd</div>
<a class="a">ccc</a>
</div>

JS code:
test 1 :
var a = getElementsByClassName(document,"a","info-links");
alert(a[0].innerHTML +"   "+a[1].innerHTML);
for(var i=0;i<a.length;i++){
a[i].style.color="red";
}
//test 2 :
var b = getElementsByClassName(document.getElementById("container"), "div", "col");
for(var m=0;m<b.length;m++){
b[m].style.color="red";
}
**************/
function getElementsByClassName(oElm, strTagName, strClassName){
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
	return (arrReturnElements);
}




/**************
replaceAll：
替换字符串中的字符。
用法：
yourstring.replaceAll("要替换的字符", "替换成什么");
例子:
"cssrain".replaceAll("s", "a");
"   cs   sr   ai   n".replaceAll(" ", "");
**************/
String.prototype.replaceAll = function (AFindText,ARepText){
    raRegExp = new RegExp(AFindText,"g");
    return this.replace(raRegExp,ARepText);
}


/**************
 * 字符串前后空格处理。
 * 如果想替换中间的空格，请用replaceAll方法。
 * 用法：
 * "  cssrain   ".trim();
**************/
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g,"");//将字符串前后空格,用空字符串替代。
}


/**************
* 计算字符串的真正长度
//String有个属性length，但是它不能区分英文字符，
//计算中文字符和全角字符。但是在数据存储的时候中文和全角都是用两个字节来存储的，
//所有需要额外处理一下。自己写了个函数，返回String正真的长度.
用法：
<input type="text" name="rain" id="rain" />
<input type="button" id="test" value="test" onclick="alert(  document.getElementById('rain').value.codeLength()  )"/>
**************/
String.prototype.codeLength=function(){
	var len=0;
	if(this==null||this.length==0)
	  return 0;
	var str=this.replace(/(^\s*)|(\s*$)/g,"");//去掉空格
	for(i=0;i<str.length;i++)
	  if(str.charCodeAt(i)>0&&str.charCodeAt(i)<128)
	   len++;
	  else 
	   len+=2;
	return len;
} 


//JS获取字符串的实际长度，用来代替 String的length属性
String.prototype.length = function(){
    return this.replace.(/[\u4e00-\u9fa5]+/g,"**").length;
}



/**************
//编码HTML  和  解码Html。
//在评论的时候为了防止用户提交带有恶意的脚本，可以先过滤HTML标签，过滤掉双引号，单引号，符号&，符号<，符号
用法：
<input type="text" name="rain" id="rain" />
<input type="button" value="test" onclick=" document.getElementById('rain2').value= document.getElementById('rain').value.htmlEncode()  "/>
<input type="text" name="rain2" id="rain2" />
<input type="button" value="test" onclick=" document.getElementById('rain').value= document.getElementById('rain2').value.htmlDecode()  "/>
**************/

String.prototype.htmlEncode=function(){
    return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&#34;").replace(/\'/g,"&#39;");
}
String.prototype.htmlDecode=function(){
    return this.replace(/\&amp\;/g, '\&').replace(/\&gt\;/g, '\>').replace(/\&lt\;/g, '\<').replace(/\&quot\;/g, '\'').replace(/\&\#39\;/g, '\'');
}

/*
当我们想在页面加载之后执行某个函数，肯定会想到onload了
但onload在浏览器看来，就是页面上的东西全部都加载完毕后才能发生，但那就为时已晚了。
如果只需要对DOM进行操作，那么这时就没必要等到页面全部加载了。我们需要更快的方法。
Firefox有DOMContentLoaded事件可以轻松解决，可惜的就是IE没有。 
MSDN关于JSCRIPT的一个方法有段不起眼的话，当页面DOM未加载完成时，
调用doScroll方法时，会产生异常。那么我们反过来用，如果不异常，那么就是页面DOM加载完毕了！
跟jquery中的ready功能类似。

用法：
function a(){
alert(1);  
}
IEContentLoaded(  document.getElementById("test") , a  );

*/
function IEContentLoaded (w, fn) {    
    var d = w.document, done = false,    
    // only fire once    
    init = function () {    
        if (!done) {    
            done = true;    
            fn();    
        }    
    };    
    // polling for no errors    
    (function () {    
        try {    
            // throws errors until after ondocumentready    
            d.documentElement.doScroll('left');    
        } catch (e) {    
            setTimeout(arguments.callee, 50);    
            return;    
        }    
        // no errors, fire    
        init();    
    })();    
    // trying to always fire before onload    
    d.onreadystatechange = function() {    
        if (d.readyState == 'complete') {    
            d.onreadystatechange = null;    
            init();    
        }    
    };    
} 



/**************
用来window.load 多个函数。
window.onload是不能同时加载多个函数的；
比如：
function t(){
alert("t")
}
function b(){
alert("b")
}
window.onload =t ;
window.onload =b ;
这样做 ，只会输出 b ；

addLoadEvent()这个函数 就是解决这个问题的。
用法：
addLoadEvent(t);
addLoadEvent(b);
**************/
function addLoadEvent(func) {
   var oldonload = window.onload;
    if (typeof window.onload != 'function') {
      window.onload = func;
    } else {  
    window.onload = function() {
      oldonload();
      func();
    }
  }
}


//支持 FF的 onmouseenter  和 onmouseleave。
/*
 由于ff 不支持 onmouseenter  和 onmouseleave。
 下面这个方法 就是为了解决 ff 下的这个问题。
 用法：
		   function init()
			{
				var theList = document.getElementById('theList');
				xb.addEvent(theList, 'mouseenter', enter, false);
				xb.addEvent(theList, 'mouseleave', leave, false);
			}
			
			function enter(e)
			{
				alert('mouseenter: ' + this.id);
			}
			
			function leave(e)
			{
				alert('mouseleave: ' + this.id);
			}
*/

var xb =
{
	evtHash: [],

	ieGetUniqueID: function(_elem)
	{
		if (_elem === window) { return 'theWindow'; }
		else if (_elem === document) { return 'theDocument'; }
		else { return _elem.uniqueID; }
	},

	addEvent: function(_elem, _evtName, _fn, _useCapture)
	{
		if (typeof _elem.addEventListener != 'undefined')
		{
			if (_evtName == 'mouseenter')
				{ _elem.addEventListener('mouseover', xb.mouseEnter(_fn), _useCapture); }
			else if (_evtName == 'mouseleave')
				{ _elem.addEventListener('mouseout', xb.mouseEnter(_fn), _useCapture); } 
			else
				{ _elem.addEventListener(_evtName, _fn, _useCapture); }
		}
		else if (typeof _elem.attachEvent != 'undefined')
		{
			var key = '{FNKEY::obj_' + xb.ieGetUniqueID(_elem) + '::evt_' + _evtName + '::fn_' + _fn + '}';
			var f = xb.evtHash[key];
			if (typeof f != 'undefined')
				{ return; }
			
			f = function()
			{
				_fn.call(_elem);
			};
		
			xb.evtHash[key] = f;
			_elem.attachEvent('on' + _evtName, f);
	
			// attach unload event to the window to clean up possibly IE memory leaks
			window.attachEvent('onunload', function()
			{
				_elem.detachEvent('on' + _evtName, f);
			});
		
			key = null;
			//f = null;   /* DON'T null this out, or we won't be able to detach it */
		}
		else
			{ _elem['on' + _evtName] = _fn; }
	},	

	removeEvent: function(_elem, _evtName, _fn, _useCapture)
	{
		if (typeof _elem.removeEventListener != 'undefined')
			{ _elem.removeEventListener(_evtName, _fn, _useCapture); }
		else if (typeof _elem.detachEvent != 'undefined')
		{
			var key = '{FNKEY::obj_' + xb.ieGetUniqueID(_elem) + '::evt' + _evtName + '::fn_' + _fn + '}';
			var f = xb.evtHash[key];
			if (typeof f != 'undefined')
			{
				_elem.detachEvent('on' + _evtName, f);
				delete xb.evtHash[key];
			}
		
			key = null;
			//f = null;   /* DON'T null this out, or we won't be able to detach it */
		}
	},
	
	mouseEnter: function(_pFn)
	{
		return function(_evt)
		{
			var relTarget = _evt.relatedTarget;				
			if (this == relTarget || xb.isAChildOf(this, relTarget))
				{ return; }

			_pFn.call(this, _evt);
		}
	},
	
	isAChildOf: function(_parent, _child)
	{
		if (_parent == _child) { return false };
		
		while (_child && _child != _parent)
			{ _child = _child.parentNode; }
		
		return _child == _parent;
	}	
};
/* end */

//DOM没有提供insertAfter(),只提供了一个insertBefore()方法。
//在这里，我们自己编写一个 insertAfter().
/**************
用法：
//插入到 div   b 的后面 
window.onload=function(){
   var a =document.createElement("span");
   var b =document.createTextNode("cssrain");
   a.appendChild(b);
   
   var mubiao = document.getElementById("b");
   insertAfter(a,mubiao);	 
}

<div id="b">bbbbbbbbb</div>
<div>dddddd</div>
**************/
function insertAfter(newElement,targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {// 如果最后的节点是目标元素，则直接添加。因为默认是最后
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement,targetElement.nextSibling);//如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面。
  }
}


/**************
解决 style 外嵌样式 用js 获取不到 的问题。
用法：
window.onload = function(){
	var e1 = document.getElementById("exep1");
	alert(getStyle(e1,"fontSize"));
	alert(getStyle(e1,"backgroundColor"));
}

<!--
currentStyle 对象返回了元素上的样式表，但是 style 对象只返回通过 STYLE 标签属性应用到元素的内嵌样式。
因此，通过 currentStyle 对象获取的样式值可能与通过 style 对象获取的样式值不同。
例如，如果段落的 color 属性值通过链接或嵌入样式表设置为红色( red )，
而不是内嵌的话，对象.currentStyle.color 将返回正确的颜色，
而对象 style.color 不能返回值。
但是，如果用户指定了 <P STYLE="color:'red'">，currentStyle 和 STYLE 对象都将返回值 red。
-->
</head>
 
<body>
<div id="exep1">c</div>
</body>
**************/
function getStyle(elem, name){
	if(elem.style[name])
		return elem.style[name];
	else if(elem.currentStyle)//ie
		return elem.currentStyle[name];
	else if(document.defaultView && document.defaultView.getComputedStyle){//w3c
		name = name.replace(/([A-Z])/g,"-$1");
		name = name.toLowerCase();
		
		var s = document.defaultView.getComputedStyle(elem,"");
		return s && s.getPropertyValue(name);
	} else
		return null
}
 

/**************
//获取当前元素的  元素节点
如果想获取当前元素的下一个节点。
那么可以扩展下：
比如:
 var elem = getNextElement( node.nextSibling );
用法;
 var elem = getNextElement( node );
**************/
function getNextElement(node) {//获取当前元素的元素节点
  if(node.nodeType == 1) {
	return node;
  }
  if (node.nextSibling) {
    return getNextElement(node.nextSibling);//如果不是，继续查询下一个，直到  if(node.nodeType == 1) .
  }
  return null;
}


/**************
默认的 element.className = "" ;是 替换样式。
如果我们是想追加样式， 那么使用下面的方法
用法;
addClass(element,"classname");
用了这个函数后：
那么将追加成 ：
<p class=”b  classname”>aaaaaaaaaaaaaaaaaaa</p>
**************/
function addClass(element,value) { //追加样式，而不是替换样式
  if (!element.className) {
    element.className = value;
  } else {
    element.className+= " ";
    element.className+= value;
  }
}


/**************
表格隔行变色。
注意：引入 我们自己写的 addClass()函数。
**************/
function stripeTables() {
  if (!document.getElementsByTagName) return false;
  var tables = document.getElementsByTagName("table");
  for (var i=0; i<tables.length; i++) {
    var odd = false;
    var rows = tables[i].getElementsByTagName("tr");
    for (var j=0; j<rows.length; j++) {
      if (odd == true) {
        addClass(rows[j],"odd");//odd为样式名
        odd = false;
      } else {
        odd = true;
      }
    }
  }
}

/**************
表格滑过变色.
注意：引入 我们自己写的 addClass()函数。
**************/
function highlightRows() {
  if(!document.getElementsByTagName) return false;
  var rows = document.getElementsByTagName("tr");
  for (var i=0; i<rows.length; i++) {
    rows[i].oldClassName = rows[i].className
    rows[i].onmouseover = function() {
      addClass(this,"highlight");//highlight为样式名
    }
    rows[i].onmouseout = function() {
      this.className = this.oldClassName
    }
  }
}



/********************
隔行变色 + 滑过变色 
参数设置：
id 为表格的id
class1为奇数行的颜色
class2为偶数行的颜色
class3为鼠标滑过颜色
用法：
sti_table("cssrain" , "c" , "a" ,"d" ); 
  <style>
.a{
background-color : #eee;
}

.c{
background-color : #96dd33;
}

.d{
background-color : #456577;
}
  </style>
  <TABLE id="cssrain" >
<TR>
	<TD>1</TD>
</TR>
</table>
*********************/
function sti_table( id , class1 , class2 , class3  ){
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

}


//格式化日期和数字
//用法：
//var date=new Date();
//var dateText = format("YYYY-MM-DD",date)
//var numberText=format("###.#",5432.545)
//document.write(dateText)
//document.write("<br />"+numberText)
//like the ISO 8895
//also see Java's SimpleDateFormat.
//
//Letter  Date or Time Component  Presentation       Examples          UserDic
//Y       Year                    Year            1996; 96
//M       Month in year           Month           July; Jul; 07     *
//D       Day in month            Number          10
//w       Day in week             Text            Tuesday; Tue; 2   *
//h       Hour in day (0-23)      Number             0
//m       Minute in hour          Number            30
//s       Second in minute        Number             55

//Pattern                             Sample
//YYYY-MM-DD hh:mm:ss          2001-07-04 12:08:56
//YYYY-MM-DDThh:mm:ss          2001-07-04T12:08:56
//YYYY/MM/DDThh:mm:ss          2001/07/04T12:08:56
//YYYY年MM月DD日,周w            2008年12月12日,周3
//hh:mm                          12:08


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
//var numberText = format("##.#",123.456)//output 123.45

function format(pattern,data){
    if(data instanceof Date){
        function dl(data,format){//3
            format = format.length;
            data = data || 0;
            return format = 1 ? data : String(Math.pow(10,format)+data).substr(-format);
        }
        return pattern.replace(/([YMDhsm])\1*/g,function(format){
            switch(format.charAt()){
            case 'Y' :
                return dl(data.getFullYear(),format);
            case 'M' : 
                return dl(data.getMonth()+1,format);
            case 'D' : 
                return dl(data.getDate(),format);
            case 'w' :
                return data.getDay()+1;
            case 'h' :
                return dl(data.getHours(),format);
            case 'm' : 
                return dl(data.getMinutes(),format);
            case 's' : 
                return dl(data.getSeconds(),format);
            }
        });
    }else if('number' == typeof data){
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
                }
                return data;
            }else{
                return '';
            }
        }
        return pattern.replace(/([#0,]*)?(?:\.([#0,]+))?/,function(param,intPattern,floatPattern){
            var floatPurePattern = floatPattern.replace(/[^\d#]/g,'');
            data = data.toFixed(floatPurePattern.length).split('.');
            return trim(data[0] ,intPattern) + trim(data[1] || '',floatPattern,floatPurePattern);
        })
    }
}


//除法函数，用来得到精确的除法结果 
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。 
//调用：accDiv(arg1,arg2) 
//返回值：arg1除以arg2的精确结果 
function accDiv(arg1,arg2){ 
	var t1=0,t2=0,r1,r2; 
	try{t1=arg1.toString().split(".")[1].length}catch(e){} 
	try{t2=arg2.toString().split(".")[1].length}catch(e){} 
	with(Math){ 
	r1=Number(arg1.toString().replace(".","")) 
	r2=Number(arg2.toString().replace(".","")) 
	return (r1/r2)*pow(10,t2-t1); 
	} 
} 
//给Number类型增加一个div方法
//用法： (37).div(3);
Number.prototype.div = function (arg){ 
	return accDiv(this, arg); 
} 

//乘法函数，用来得到精确的乘法结果 
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。 
//调用：accMul(arg1,arg2) 
//返回值：arg1乘以arg2的精确结果 
function accMul(arg1,arg2) { 
	var m=0,s1=arg1.toString(),s2=arg2.toString(); 
	try{m+=s1.split(".")[1].length}catch(e){} 
	try{m+=s2.split(".")[1].length}catch(e){} 
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
	} 
	//给Number类型增加一个mul方法
	//用法： (37).mul(3);
	Number.prototype.mul = function (arg){ 
	return accMul(arg, this); 
} 

//加法函数，用来得到精确的加法结果 
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。 
//调用：accAdd(arg1,arg2) 
//返回值：arg1加上arg2的精确结果 
function accAdd(arg1,arg2){ 
	var r1,r2,m; 
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} 
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0} 
	m=Math.pow(10,Math.max(r1,r2)) 
	return (arg1*m+arg2*m)/m 
	} 
	//给Number类型增加一个add方法
	//用法： (37).add(3);
	Number.prototype.add = function (arg){ 
	return accAdd(arg,this); 
}

//减法函数，用来得到精确的减法结果 
function Subtr(arg1,arg2){
     var r1,r2,m,n;
     try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
     try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
     m=Math.pow(10,Math.max(r1,r2));
     //last modify by deeka
     //动态控制精度长度
     n=(r1>=r2)?r1:r2;
     return ((arg1*m-arg2*m)/m).toFixed(n);
} 
//给Number类型增加一个add方法
//用法：  (5.5).sub(37.5) 
Number.prototype.sub = function (arg){ 
	return Subtr(arg,this); 
}


//格式化字符串
/*
用法：
var cls="redclass";
var text="My name is ";
var str='<div class="{0}">{1} {2}</div>'.diy_format(cls, text,"cssrain");
alert(str);
*/
String.prototype.diy_format=function(){
    var args=arguments;
    return this.replace(/\{(\d+)\}/g, function(m, i){
        return args[i];}
	);
}


//去掉数组中重复的元素
//用法：
//var arr=["abc",85,"abc",85,8,8,1,2,5,4,7,8];
//alert(  arr.strip()  );
Array.prototype.strip=function(){
	if(this.length<2) return [this[0]]||[];
	var arr=[];
	for(var i=0;i<this.length;i++){
		arr.push(this.splice(i--,1));
		for(var j=0;j<this.length;j++){
			if(this[j]==arr[arr.length-1]){
				this.splice(j--,1);}}}
	return arr;
}



//得到l-h下标的数组
//用法：
//var arr=["abc",85,"abc",85,8,8,1,2,5,4,7,8];
//alert( arr.limit(2,4) ); //输出  abc , 85 ,8  
Array.prototype.limit = function(l, h) {
var _a = this; var ret = []; 
l = l<0?0:l; h = h>_a.length?_a.length:h;
for (var i=0; i<_a.length; i++) {
if (i>=l && i<=h) ret[ret.length] = _a[i];
if (i>h) break;
}; return ret;
}

//指定array是否包含指定的item
//array.exists( item ) 包含true;不包含false;
//用法：
//var array1  = [1,2,3,4,5,"a","b"];
//var b1  =  array1.exists("b") // 包含true;不包含false;//alert(b1)
function Array.prototype.exists( item )
{
	for( var i = 0 ; i < this.length ; i++ )
	{
		if( item == this[i] )
		{
			return true;
		}
	}
	return false;
}

//删除指定的item
//array.remove(item) 删除item
//用法：
//var array1  = [1,2,3,4,5,"a","b"];
//array1.remove("2");
//alert( array1[1] );
function Array.prototype.remove( item )
{
	for( var i = 0 ; i < this.length ; i++ )
	{
		if( item == this[i] )
		{
			break;
		}
	}
	if( i == this.length )
	{
		return;
	}
	for( var j = i ; j < this.length - 1 ; j++ )
	{
		this[ j ] = this[ j + 1 ];
	}
	this.length--;
}


//得到url参数值
// url: http:www.cssrain.cn/article.asp?id=100
// var id = getParameter("id");
// alert(id);
function getParameter(key)
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
}



//获取某月有几天 ，月份是从 0开始
//用法：alert(  jscomGetMonthDays(2008 ,  4)   )
function jscomGetMonthDays(year,month)
{
	if(month<0 || month>11)
	{
		return 30;
	}
	var arrMon = new Array(12);
	arrMon[0] = 31;
	if(year % 4 == 0)
	{
		arrMon[ 1] =29;
	}else{
		arrMon[ 1] =28;
	}	
	arrMon[ 2] = 31;	arrMon[ 3] = 30;
	arrMon[ 4] = 31;	arrMon[ 5] = 30;
	arrMon[ 6] = 31;	arrMon[ 7] = 31;
	arrMon[ 8] = 30;	arrMon[ 9] = 31;
	arrMon[10] = 30;	arrMon[11] = 31;	
	return arrMon[month];
}

/**
 * 以document.write的方式向页面中写入js
 * 参数 ： 
 o {
   id : id of the created tag, 
   url : String,
   script  : String
  }
 用法： dwScript({id : 'cssrain'  , url :  'js/fl.js' });
 */
function dwScript(o){
  o.id = o.id || "";
  o.charset = o.charset || "utf-8";
  if (o.script && o.script != ""){
    document.write("<script id='" + o.id + "'>" + o.script + "<\/script>");
  } else if (o.url && o.url != ""){
    document.write("<script id='" + o.id + "' src='" + o.url + "' charset='" + o.charset + "'><\/script>");
  } else throw new Error("no script content or url specified");
}


/**
 * 以document.write的方式向页面中写入css
 * @param o {
 *    id : id of the created tag, 
 *    url : String,
 *    styles  : styles text
 *  }
用法：dwCSS({ id :  'cssrain'  , url:'css/default.template.css?'});
 */
function dwCSS(o){
  o.id = o.id || "";
  if (o.url){
    document.write('<link id="' + o.id + '" rel="stylesheet" type="text/css" href="' + o.url + '" />');
  } else if (o.styles){
    document.write('<style id="' + o.id + '" >'+o.styles+'<\/style>');
  } 
}


/**
 * 把字符串中 的 半角 转换为全角。
 用法：
 var a  =  "d'd'd'd()%[]";
 alert(toSafe(a));

 当然可以用于表单的值转换。
 */
function toSafe(str)
{
	var re;
	re = /'/g;
	str = str.replace(re,"＇");
	re =/\)/g;
	str = str.replace(re,"）");
	re = /\(/g;
	str = str.replace(re,"（");
	re = /%/g;
	str = str.replace(re,"％");
	re = /\[/;
	str = str.replace(re,"［");
	re = /\]/;
	str = str.replace(re,"］");
	return str;
}
function makeToSafe(formName)
{
	var i,form;
	form = eval(formName);
	for(i=0;i<form.elements.length;i++)
	{
		if(form.elements[i].type=="text" || form.elements[i].type=="textarea")
		{
			form.elements[i].value = toSafe(form.elements[i].value);
		}
	}
}


/*
   小数   四舍五入
//Dight 为要转换的数据
//How  要保留的小数位数
 用法:
var k = ForDight(  222.5  ,  0 )  ;
 */
function ForDight(Dight,How) 
{
		Dight = Math.round (Dight*Math.pow(10,How))/Math.pow(10,How); 
		return Dight; 
}

/*
计时器。
用法：
<div id="cssrain">aaa</div>

<SCRIPT >
var test = document.getElementById("cssrain");

//测试一个例子，3秒后隐藏div。
function hideDiv()
{
  test.style.color = "red";
}

var cs = new timerPerActive(3 , hideDiv );
cs.callback();
*/

function timerPerActive(timer,comfunc) //对象 
{ 
this.times=0;//定时器对象 ，初始化为0
this.change=function() 
	{ 
	this.times++; 
	test.innerHTML = this.times;//测试用的
	if(this.times==timer) 
		{ 
		clearInterval(times); 
		this.complete();    //最终要回调的函数
		} 
	} 
this.callback=function()  //每过1秒，调用
	{ 
	var css=this; 
	times=setInterval(function(){css.change();},1000); 
	} 
this.complete=function() //完成后，调用
	{
    comfunc();
    }
} 

    
//   计算日期为当年的第几周     
//   用法：    
//   获取   2008-7-5  为当年的第几周     
//   返回:  28     
// document.write(  weekOfYear(2008 ,   7 ,   5)  );  
      function   weekOfYear(year,   month,   day){     
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
      }   

//   通过周数和星期计算日期  
//   获取   2005   年第   37   周的周六的日期   。 (0-6,   0代表周日)       
//   返回:   2005年9月10号     
//   alert(dateFromWeek(2005,   37,   6));   
  function   dateFromWeek(year,   week,   day){     
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


/**************
format：
格式化时间。
用法：
yourdate.format("你的日期格式");
例子:
obj0 = new Date("Sun May 04 2008").format("yyyy-MM-dd");
obj1 = new Date().format("yyyy-MM-dd hh:mm:ss");
obj2 = new Date().format("yyyy-MM-dd");
obj3 = new Date().format("yyyy/MM/dd");
obj4 = new Date().format("MM/dd/yyyy");
**************/
Date.prototype.format = function(format)   
{   
   var o = {   
     "M+" : this.getMonth()+1, //month   
     "d+" : this.getDate(),    //day   
     "h+" : this.getHours(),   //hour   
     "m+" : this.getMinutes(), //minute   
     "s+" : this.getSeconds(), //second   
     "q+" : Math.floor((this.getMonth()+3)/3), //quarter   
     "S" : this.getMilliseconds() //millisecond   
   }   
   if(/(y+)/.test(format)) format=format.replace(RegExp.$1,   
     (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
   for(var k in o)if(new RegExp("("+ k +")").test(format))   
     format = format.replace(RegExp.$1,   
       RegExp.$1.length==1 ? o[k] :    
         ("00"+ o[k]).substr((""+ o[k]).length));   
   return format;   
} 

/**************
日期减去天数 得到 第二个日期 。
例子:
data_sub_day("12/23/2002",30)
**************/
function data_sub_day(dd,dadd)
{
//可以加上错误处理
var a = new Date(dd)
a = a.valueOf()
a = a - dadd * 24 * 60 * 60 * 1000
a = new Date(a)
alert(a.getFullYear() + "年" + (a.getMonth() + 1) + "月" + a.getDate() + "日")
}


/**************
format：
格式化数字.
例子:
var n = format_number( 123456.45656 , 2 ); // .toFixed(2)也可以实现，不过不兼容FF.
alert(n); 
**************/
function format_number(str,digit)
{
 if(isNaN(str))
 {
  alert("您传入的值不是数字！");
  return 0;
 }
 else if(Math.round(digit)!=digit)
 {
  alert("您输入的小数位数不是整数！");
  return 0;
 }
 else 
  return Math.round(parseFloat(str)*Math.pow(10,digit))/Math.pow(10,digit);
} 



/**************
 * 得到单选框选中的值。
 * 用法：
 *<input type="radio"  value="1" name="cssrain"/>
 *<input type="radio"  value="2" name="cssrain" checked/>
 *<input type="radio"  value="3" name="cssrain"/>
 *<input type="button" onclick="alert(getRadioValue('cssrain'))" value="test"/>
**************/
function getRadioValue(radioName){
	var obj=document.getElementsByName(radioName);
	for(var i=0;i<obj.length;i++){
		if(obj[i].checked){
			return obj[i].value;
		}
	}
} 

/**************
 * 复选框全选/不选/反选
 * 用法：
<form id="form_a">
<input type="checkbox"  value="1" name="a"/>
<input type="checkbox"  value="2" name="a" checked/>
<input type="checkbox"  value="3" name="a"/>
<input type="button" value="全选" onclick="checkAll(document.getElementById('form_a'),'all')"/>
<input type="button" value="不选" onclick="checkAll(document.getElementById('form_a'),'none')"/>
<input type="button" value="反选" onclick="checkAll(document.getElementById('form_a'),'')"/>
</form>
**************/
function checkAll(form, sel) {
	for (i = 0, n = form.elements.length; i < n; i++) {
		if(form.elements[i].type == "checkbox") {
			if(form.elements[i].checked == true) {
				form.elements[i].checked = (sel == "all" ? true : false);
			} else {
				form.elements[i].checked = (sel == "none" ? false : true);
			}
		}
	}
}


/**************
 * 复选框检查是否选中。
 * 如果没一个选中，会返回false.
 * 用法：
 <form id="form_a" name="form_a">
<input type="checkbox"  value="1" name="a"/>
<input type="checkbox"  value="2" name="a" checked/>
<input type="checkbox"  value="3" name="a"/>
<input type="button" value="全选" onclick="alert( SCheckBox('form_a','a') )"/>
</form>
**************/
function SCheckBox(_formName,_checkboxName){
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
}


/**************
收藏到书签.(兼容IE和FF)。
用法:
<input type="button" value="收藏" onclick="addBookmark('cssrain(前端开发)','http://www.cssrain.cn')"/> 
**************/
function addBookmark(title,url) {
	if (window.sidebar) {
		window.sidebar.addPanel(title, url,"");
	} else if( document.all ) {
		window.external.AddFavorite( url, title);
	} else if( window.opera && window.print ) {
		return true;
	}
}

/**************
函数 ： 文本框得到与失去焦点 操作。
这个方法经常在文本框搜索的时候出现。
文本里显示 “ 搜索 ”，然后当用户鼠标点击此文本，
文本框内容清空。如果用户没填写内容，那么文本的值又复原。
如果填写了，就显示用户填写的。
 用法:
 <input type="" value="关键字搜索" name="a" onfocus="clearTxt('a','关键字搜索')" onblur="fillTxt('a','关键字搜索')"/>
<input type="text" value="test" name="test" />
**************/
function clearTxt(id,txt) {
  if (document.getElementById(id).value == txt)
    document.getElementById(id).value="" ;
  return ;
}
function fillTxt(id,txt) {
  if ( document.getElementById(id).value == "" )
    document.getElementById(id).value=txt;
  return ;
}
//也可以使用 defaultValue属性 来做：
//例子：
/*
<input type="text"  value="搜索"/>
<input type="text"  value="请输入名称"/>
<SCRIPT LANGUAGE="JavaScript">
 var inputs =document.getElementsByTagName("input");
 for(var i=0;i<inputs.length;i++){
     if (inputs[i].type == "submit") continue;
     if (!inputs[i].defaultValue) continue;
      inputs[i].onfocus = function(){
	      if(this.value == this.defaultValue )
		  {
                 this.value = "";
		  }
	  }   //end of onfocus
	    inputs[i].onblur = function(){
	      if(this.value == "" )
		  {
                this.value = this.defaultValue;
		  }
	  }   //end of onblur 
 }
</SCRIPT>
*/




/**************
函数 ： 用来判断鼠标按的是左键还是右键。(兼容IE和ff)
用法:
onmousedown="mouse_keycode(event)"
**************/
function mouse_keycode(event){
    var event=event||window.event;
    var nav=window.navigator.userAgent;
    if (nav.indexOf("MSIE")>=1) //如果浏览器为IE.解释：因为 document.all 是 IE 的特有属性，所以通常用这个方法来判断客户端是否是IE浏览器 ,document.all?1:0; 
  { 
   if(event.button==1){alert("左键")}
   else if(event.button==2){alert("右键")}
  }
  else if(nav.indexOf("Firefox")>=1) ////如果浏览器为Firefox 
  {
   if(event.button==0){alert("左键");}
   else if(event.button==2){alert("右键");}
  }
   else{ //如果浏览器为其他 
    alert("other");
   } 
}


/**************
函数 ：触发某个对象的onclick事件。（兼容IE和FF）
用法: 
<input type="button" value="aaa" id="a" onclick=" alert('cssrain') " />
<input type="button" value="触发ID为a的onclick事件" onclick=" handerToClick('a') " />
**************/
function handerToClick(objid){
	var obj=document.getElementById(objid);
	if(document.all){
		obj.fireEvent("onclick");
	}else{
	  	var e=document.createEvent('MouseEvent');
	  	e.initEvent('click',false,false);
	  	obj.dispatchEvent(e);
	}
}


/**************
回车提交。
用法:
<input   type=text   onkeydown="keysubmit()">   
**************/
function keysubmit()
{
    if(event.keyCode==13)
   {
	   form.submit();
   }
}

/**************
实现Ctrl+Enter 提交的效果.(兼容IE和FF)
在做这个效果时，发现一个问题，
当表单中如果只有一个文本框时，
回车会默认提交。(没有提交按钮也一样。)
用法:
<form action="#"  name="a">
<input   type="text" />   
<input   type="text"   onkeydown="QuickPost( event , document.a )" />   
</form>
**************/
 function QuickPost(event,form){
    var event=event||window.event;
	if((event.ctrlKey && event.keyCode == 13)||(event.altKey && event.keyCode == 83)){
 	//	event.srcElement.form.submit();
	  form.submit();
	}
}


/**************
回车自动跳到下一个文本框。
注;此方法不兼容FF，
因为在FF下，event.keycode是只读属性，不能赋值。
用法:
<form action="#"  name="a" onkeydown="QuickNext()">
<input   type="text" />   
<input   type="text"   />   
<input   type="button" value="test"  />  
</form>
**************/
function   QuickNext()   
  {  
  //判断是否为button, 是因为在HTML上会有type="button"
  //判断是否为submit,是因为HTML上会有type="submit"
  //判断是否为reset,是因为HTML上的"重置"应该要被执行
  //判断是否为空,是因为对于HTML上的"<a>链接"也应该被执行,
  //这种情况发生的情况不多,可以使用"tabindex=-1"的方式来取消链接获得焦点.
      if(event.keyCode==13 && event.srcElement.type!='button' && event.srcElement.type!='submit' && event.srcElement.type!='reset' && event.srcElement.type!='textarea' && event.srcElement.type!='') 
           {   event.keyCode = 9; }
  }   


/**************
按TAB键移动到下一个输入框时，光标停在文本框文字的最后，方便用户继续输入.
IE默认是全部选中。此方法不兼容FF。
用法:
 <input type='text' value='0592' onfocus="moveEnd()"> 
**************/
function moveEnd()
{
	var e=event.srcElement;
	var r=e.createTextRange();
	r.moveStart('character',e.value.length);
	r.collapse(true);
	r.select();
}



/**************
TEXTAREA自适应文字的行数 .
注;此方法不兼容FF，(onpropertychange)
参数：当前对象 和 最小高度
用法:
<textarea rows=5 name=s1 cols=27 onpropertychange="textarea_scroll(this,60)" style="overflow-y:hidden">
</textarea>
**************/
	function textarea_scroll(obj,min)
	{
		if(obj.scrollHeight<min){
          obj.style.posHeight=min
		}else{
          obj.style.posHeight=obj.scrollHeight
		}
	}


/**************
改变下拉框选项后，根据选项的不同弹出不同的窗口.
用法:
<select onchange="return select_pop(this);" >
<option  selected="selected">--分公司--</option>
<option value="http://www.bj.chinaunicom.com">北京</option>
<option value="http://www.sh.chinaunicom.com">上海</option>
</select> 
**************/
function select_pop(fileurl){
    if (fileurl.options[fileurl.selectedIndex].value != "")
		window.open(fileurl.options[fileurl.selectedIndex].value,"_blank","toolbar=yes,location=yes,menubar=yes,scrollbars=yes,resizable=yes,left=50,height=500,width=700");
	return true;
}



/**************
得到字符串的字节数。
用法:
<input   type="text" name="a" />   
<input   type="button" value="test"  onclick="alert(  strlen(document.getElementById('a').value )  )" />  
**************/
//
function strlen(string){
      var str="";
      str=string;
      str=str.replace(/[^\x00-\xff]/g,"**"); 
      return str.length;
 }
//或者
function ByteLength(string){
	return string.replace(/[^\x00-\xff]/g,"00").length;	
}


/**************
文本框输入字符控制。
只能输入数字。
用法:
<input onkeyup="input_shuzi(this)" onbeforepaste="input_shuzi_before()" />
**************/
function input_shuzi(obj)
{
obj.value=obj.value.replace(/[^\d]/g,'');
}
function input_shuzi_before(){
clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''));
}

/**************
文本框输入字符控制。
只能输入数字和英文。
用法:
<input onkeyup="input_shuziyinwen(this)" onbeforepaste="input_shuziyinwen_before()" />
**************/
function input_shuziyinwen(obj)
{
obj.value=obj.value.replace(/[\W]/g,'');
}
function input_shuziyinwen_before(){
clipboardData.setData('text',clipboardData.getData('text').replace(/[\W]/g,''));
}

/**************
文本框输入字符控制。
只能输入汉字。
用法:
<input onkeyup="input_hanzi(this)" onbeforepaste="input_hanzi_before()" />
**************/
function input_hanzi(obj)
{
obj.value=obj.value.replace(/[^\u4E00-\u9FA5]/g,'');
}
function input_hanzi_before(){
clipboardData.setData('text',clipboardData.getData('text').replace(/[^\u4E00-\u9FA5]/g,''));
}

/**************
文本框输入字符控制。
只能输入全角。
用法:
<input onkeyup="input_quanjiao(this)" onbeforepaste="input_quanjiao_before()" />
**************/
function input_quanjiao(obj)
{
obj.value=obj.value.replace(/[^\uFF00-\uFFFF]/g,'');
}
function input_quanjiao_before(){
clipboardData.setData('text',clipboardData.getData('text').replace(/[^\uFF00-\uFFFF]/g,''));
}


/**************
*只允许输入数字和小数点。
*用法：
*<input type=text  onkeyup="clearNoNum(this)"/>
**************/
function clearNoNum(obj)
{
//先把非数字的都替换掉，除了数字和.
obj.value = obj.value.replace(/[^\d.]/g,"");
//必须保证第一个为数字而不是.
obj.value = obj.value.replace(/^\./g,"");
//保证只有出现一个.而没有多个.
obj.value = obj.value.replace(/\.{2,}/g,".");
//保证.只出现一次，而不能出现两次以上
obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
}

/**************
*把输入的字母转成大写。
*用法：
*<input type="text"  name="d" onkeyup="input_to_uppercase(this)" />
**************/
function input_to_uppercase(obj)
{
obj.value=obj.value.toUpperCase();
}
/**************
*把输入的字母转成小写。
*用法：
*<input type="text"  name="e" onkeyup="input_to_lowercase(this)" /> 
**************/
function input_to_lowercase(obj)
{
obj.value=obj.value.toLowerCase();
}


/**************
*判断字符中是否包含有 http:// .
*用法：
<input type="text" name="a" />
<input type="button" value="test" onclick=" alert( urlcheck(document.getElementById('a').value) )" />
**************/
function urlcheck(string){
	var re;
	re=new RegExp("http://");
	return re.test(string.toLowerCase());	
}


/**************
从URL地址中提取文件名
*用法：
var a =url_filename("http://www.cssrain.cn/abc.rar");
alert( a  ) ;// "abc"
**************/
function url_filename(string){
string=string.replace(/(.*\/){0,}([^\.]+).*/ig,"$2")
return string
}

/**************
*实时检测输入框的字数
*用法：
 <input type="text" name="explain" id="explain" onkeyup="check_input_Length(this)" >
 <small>文字最大长度: 20. 还剩: <span id="chLeft">20</span>.</small>
**************/
	function check_input_Length(which)
{
	var maxChars = 20;
	if (which.value.length > maxChars)
		which.value = which.value.substring(0,maxChars);
		var curr = maxChars - which.value.length;
		document.getElementById("chLeft").innerHTML = curr.toString();
}


/**************
*判断电子邮箱是否符合规范
*用法：
<input type="text" name="a" />
<input type="button" value="test" onclick=" alert( emailcheck(document.getElementById('a').value) )" />
**************/
function emailcheck(string){
	var re;
	re=new RegExp("^[\\w-_\\.]+@([a-z|0-9|-]+\\.)+[a-z]{2,5}$");
	return re.test(string.toLowerCase());
}


/**************
*判断用户名是否符合要求
*用法：
<input type="text" value="aaa" id="a" />
<input type="button" value="test" onclick=" alert( usernamecheck(document.getElementById('a').value )  ) " />
**************/
function usernamecheck(string){
	if((string.length<4)||(string.length>20)){return false;}
	var re;
	re=new RegExp("^[a-z|A-Z|0-9][a-z|A-Z|0-9|-]+$");
	return re.test(string);
}


/***************
* 用于检验手机号的位数以及检验此手机中是否为中国移动的手机号
* 如果还想判断联通的手机，可以改 GSMPhNo  。
用法 ：
<form name="toptransfer">
<input type="text" name="phone" />
<input type="button" value="test" onclick="checkFetionReg()"/>
</form>
**************/
function checkMBPhone(phone){
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
} 
  function checkFetionReg(){ //例子
   if(checkMBPhone(document.toptransfer.phone.value))
   {
            alert("正确");
			//do your things
   }
 }




//验证日期 yyyy/mm/dd  或  yyyy.mm.dd
//用法：
//<input id="txtdata" /> <input type="button" onclick="dateCheck()" value="test"/>
function dateCheck()
    {
    var str = document.getElementById("txtdata").value;//我这里写死了，如果需要可以自己抽象化。
    var re = new RegExp("^([0-9]{4})[./]{1}([0-9]{1,2})[./]{1}([0-9]{1,2})$");
    
    var ar;
    var res = true;
    
    if ((ar = re.exec(str)) != null){
        var i;
        i = parseFloat(ar[3]);
        if (i <= 0 || i > 31){
            res = false;
        }
        i = parseFloat(ar[2]);
        if (i <= 0 || i > 12){
            res = false;
        }
    }else{
        res = false;
    }
    if (!res){
        alert('情输入类似格式 ： 2000/11/25');
    }
    else{
     alert("success");
    }
    return res;
}


//检查输入的值，小数点后的位数
//用法：  checknumber(   '22.22'   ,   1  , "金额" );
function checknumber(value,num,str){
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
}




/***************
获取域名.
**************/
function getDomainName(){
  var s,siteUrl;
  s=document.location+"";
  return s.substring(7,s.indexOf('/',7));
}

/***************
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

/***************
* 写入COOKIE
用法 ：
setcookie:<input type="button" value="test" onclick=" setCookie('a','cssrain');alert('设置成功.') " />
getcookie:<input type="button" value="test" onclick=" alert( getCookie('a') ) " />
**************/
function setCookie(name, value){
	//document.cookie = name+"="+value
	date = new Date();
    document.cookie = name +"=" + escape(value) + ";expires=" + new Date(date.getYear()+1, date.getMonth(),date.getDate()).toGMTString() + ";path=/";
}
/***************
* 简单的读取Cookie
**************/
function getCookie(Name){ 
	var re=new RegExp(Name+"=[^;]+", "i");
	if (document.cookie.match(re)){
		return document.cookie.match(re)[0].split("=")[1];
	}else{
		return "";
	}		
}
/*
读取Cookie写法2：
function getCookie(name){
var aCookie = document.cookie.split(";");
for(var i=0; i<aCookie.length; i++)
{
	var aC = aCookie[i].split("=");
	var nTemp = aC[0].replace(' ','');
	if(name == nTemp)
	{
		return unescape(aC[1]);
	}
}
	return "";
}
*/


/*************
//增加Cookie
function addCookie(name,value,expireHours){
    var cookieString=name+"="+escape(value);
    //判断是否设置过期时间
    if(expireHours>0){
        var date=new Date();
        date.setTime(date.getTime+expireHours*3600*1000);
        cookieString=cookieString+"; expire="+date.toGMTString();
    }
    document.cookie=cookieString;
}
//获取Cookie值
function getCookie(name){
    var strCookie=document.cookie;
    var arrCookie=strCookie.split("; ");
    for(var i=0;i<arrCookie.length;i++){
        var arr=arrCookie[i].split("=");
        if(arr[0]==name){
            return unescape(arr[1]);
        }
    }
    return false;
}
//删除Cookie
function deleteCookie(name){
    var date=new Date();
    date.setTime(date.getTime()-10000);
    document.cookie=name+"=; expire="+date.toGMTString();
}
*************/


/***************
* 子窗口刷新父窗口.(写在子窗口里)
**************/
function opener_reload()
{
window.opener.location.reload();
}
//javascript:this.location.reload()// 刷新本页  window.history.go(0)
//<INPUT TYPE="button" onclick=window.history.back() value=back> //后退 window.history.go(-1);
//<INPUT TYPE="button" onclick=window.history.forward() value=forward>//前进  window.history.go(1);



/**************
* 不被浏览器拦截的弹出窗口JS代码:
* 程序弹出的窗口将不会被广告拦截软件拦截，但有一个缺点：你无法象对window.open弹出的窗口那样对外观进行定制。
* 用法：<input type=button onclick='window.force.open("a.html")' />
* 定义ForceWindow类构造函数
* 无参数
* 无返回值.
* 实例化一个ForceWindow对象并做为window对象的一个子对象以方便调用
* 定义后可以这样来使用：window.force.open("URL");
* 你当然也可以在使用前实例化一个ForceWindow对象：
* var myWindow = new ForceWindow();
* 这样来使用：
* myWindow.open("URL");
* 本程序测试通过的浏览器：IE 5+、Firefox 1.0、Mozilla 1.7.5、Netscape 7.2、Opera 7.23
**************/
function ForceWindow ()
{
this.r = document.documentElement;
this.f = document.createElement("FORM");
this.f.target = "_blank";
this.f.method = "post";
this.r.insertBefore(this.f, this.r.childNodes[0]);
}
ForceWindow.prototype.open = function (sUrl) //定义open方法 , 参数sUrl：字符串，要打开窗口的URL, 无返回值
{
this.f.action = sUrl;
this.f.submit();
}
window.force = new ForceWindow();


/**************
拷贝/复制文本框内容。（兼容IE和FF）
用法:
1，<input type="text"  name="d" id="d" value="&lt;http://www.cssrain.cn&gt;&lt;http://www.cssrain.cn&gt;" /><input id="Button1" type="button" onclick="copyText(document.getElementById('d'));" value="复制" />  <br/>
2，<textarea name="c"  id="c" rows="4" cols="20">&lt;http://www.cssrain.cn&gt;</textarea>
<input id="Button2" type="button" onclick="copyText(document.getElementById('c'));" value="复制" />
**************/
function copyText(obj)
{
    if( obj.type !="hidden" )
    {
        obj.focus();
    }
    obj.select(); 
    copyToClipboard(obj.value);
    alert("拷贝成功！");
}
function copyToClipboard(txt) {  
    if(window.clipboardData)  
    {  
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
}


//运行代码
//用法：
 //<textarea id="a">aaaaaaaa</textarea>
 //<input type="button" value="运行" onclick="runEx('a')" />

function runEx(cod1)  {
	 cod=document.getElementById(cod1)
	  var code=cod.value;
	  if (code!=""){
		  var newwin=window.open('','','');  
		  newwin.opener = null 
		  newwin.document.write(code);  
		  newwin.document.close();
	}
}


/*
插入Flash文件
在你要插入的位置 。
 <script>
  document.write( GetFlashStr("pro.swf","400px","100px",true) );
 </script>
*/
function GetFlashStr(Path,Width,Height,Transparent){
	 var Temp,T="";
	 Temp='<object classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" id="FlashH" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" border="0" width="'+Width+'" height="'+Height+'">'
	 Temp+='<param name="movie" value="'+Path+'"/>'
	 Temp+='<param name="quality" value="High"/>'
	 Temp+='<param name="scale" value="ExactFit"/>'
	 if (Transparent) {Temp+=' <param name="wmode" value="transparent"/>';T='wmode="transparent"'}
	 Temp+='<embed src="'+Path+'" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" name="FlashH" width="'+Width+'" height="'+Height+'" quality="High"'+T+' scale="ExactFit"/>'
	 Temp+='</object>'
	 return Temp;
}

/**************
//间歇性循环滚动新闻。从下往上滚动。
//拷贝以下内容，到单独的页面 即可。

<div id="icefable1" style="font-size:12px;">
<div style="text-align:left; width:100%; height:20px;"><a target="_blank" href="#" title="111">111</a></div>
<div style="text-align:left; width:100%; height:20px;"><a target="_blank" href="#" title="222">222</a></div>
<div style="text-align:left; width:100%; height:20px;"><a target="_blank" href="#" title="333">333</a></div>
<div style="text-align:left; width:100%; height:20px;"><a target="_blank" href="#" title="444">444</a></div>       
<SCRIPT LANGUAGE="JavaScript">
var marqueesRows=4; //滚动行数，与上面的div数目对应
var marqueesHeight=20; //滚动区域的高度，请同时修改上面div样式内的高度
var marqueeSpeed=30; //滚动速度(越小越快)
var pauseTime=70; //停留时间
var stopscroll=false;
var preTop=0, theTop=marqueesHeight*marqueesRows, currentTop=marqueesHeight, stoptime=0;
with(icefable1){
	style.width=186; //滚动区域的宽度
	style.height=marqueesHeight;
	style.overflowX="visible";
	style.overflowY="hidden";
	noWrap=false;
	onmouseover=new Function("stopscroll=true");
	onmouseout=new Function("stopscroll=false");
	innerHTML+=innerHTML;
	scrollTop=0;
}
setInterval("scrollUp()",marqueeSpeed);
function scrollUp(){//Modified by Dakular
	if(stopscroll==true) return;
	currentTop+=1;
	if(currentTop==marqueesHeight+1){
		stoptime+=1; currentTop-=1;
		if(stoptime==pauseTime){currentTop=0; stoptime=0;}
	}else {
		preTop=(++icefable1.scrollTop);
		if(preTop==theTop){icefable1.scrollTop=0;}
	}
}
</SCRIPT>
</div>
**************/



/**************
显示/隐藏内容。
用法:
<img src="images/close.gif" id="img_a" onClick="show_hide_display(table_a,img_a)">
<table id="table_a">
<tr>
<td>aaa</td>
</tr>
</table>
**************/
function show_hide_display(t_id,i_id){//显示/隐藏
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


/**************
使按钮有效/无效。
用法:
<form name="form_a">
<INPUT TYPE="button" NAME="aa"  value="test" onclick="input_disabled()" />
<INPUT TYPE="button" NAME="bb" value="cssrain" />
<INPUT TYPE="button" NAME="bb" value="cssrain" />
</form>
**************/
function input_disabled()
{
 for(var i=0;i<document.form_a.elements.length;i++)
   {
   if(document.form_a.elements[i].name.indexOf("bb")!=-1)
    document.form_a.elements[i].disabled=!document.form_a.elements[i].disabled;
   }
}


/**************
 * 图片自动缩小方法。
 * 用法：
<div id="d">
<img src="http://www.baidu.com/img/logo-yy.gif" width="300" height="300"/>
<img src="http://www.baidu.com/img/logo-yy.gif" />
</div>

window.onload=function(){
resizeImg(50,'d');
}
**************/
function resizeImg(maxWidth,contentId){
	var imgs=document.getElementById(contentId).getElementsByTagName("img");
	for(var i=0;i<imgs.length;i++){
		if(imgs[i].width>maxWidth){
			imgs[i].removeAttribute('width');
			imgs[i].removeAttribute('height');
			imgs[i].removeAttribute('style');
			imgs[i].width=maxWidth;
			imgs[i].style.cursor="hand";
			imgs[i].onclick = function(){
				window.open(this.src);
			}
		}
	}
}


/**************
判断浏览器和操作系统。
用法:
window.onload=function(){
       alert(getPlatform());
}
**************/
/*--GLOBAL VARIABLES--*/
var OS;
var browser;
function checkIt(string) {
	var detect = navigator.userAgent.toLowerCase();
	return detect.indexOf(string) + 1;
}
function getPlatform() {
	if (checkIt('konqueror')) {
		browser = "Konqueror";
		OS = "Linux";
	}
	else if (checkIt('safari')) 		browser = "Safari"
	else if (checkIt('omniweb')) 		browser = "OmniWeb"
	else if (checkIt('opera')) 			browser = "Opera"
	else if (checkIt('webtv')) 			browser = "WebTV";
	else if (checkIt('icab')) 			browser = "iCab"
	else if (checkIt('msie 7')) 		browser = "Internet Explorer 7"
	else if (checkIt('msie')) 			browser = "Internet Explorer"
	else if (!checkIt('compatible')) 	browser = "Netscape Navigator"
	else 								browser = "Unknown Browser";

	if (!OS) {
		if (checkIt('linux')) 		OS = "Linux";
		else if (checkIt('x11')) 	OS = "Unix";
		else if (checkIt('mac')) 	OS = "Mac"
		else if (checkIt('win')) 	OS = "Windows"
		else 						OS = "Unknown Operating System";
	}
	return browser+"|"+OS;
}


/**************
图片，超链接提示效果.tooltips
用法:
Demo1：<img src="a.gif" onmouseover="showToolTip(event,'<font style=font-size:14px;font-weight:bold;color:#000000>测试1</font><img src=b.gif  border=0 align=absmiddle>');" alt="" onmouseout="hideToolTip();" />
Demo2：<a href="a.html" onmouseover="showToolTip(event,'<font style=font-size:14px;font-weight:bold;color:#000000>测试2</font><img src=b.gif  border=0 align=absmiddle>');" alt="" onmouseout="hideToolTip();">cssrain.cn</a>
引用此方法注意 在页面上加入:
<div id="frDiv_cssrain" style="overflow: visible; position: absolute; visibility: hidden;z-index: 500">
<iframe id="ifr_cssrain" src="javascript:null" style="overflow: visible; position: relative;z-index: 500; width: 342px;height:0px;" scrolling="no" frameborder="0" marginwidth="0" marginheight="0"></iframe>
</div>
**************/
function hideToolTip(){
    parent.document.getElementById("frDiv_cssrain").style.visibility="hidden";
}
function showToolTip(event,msg){ 
        var event =event || window.event;
        var ifr_cssrain = getIFrameDocument("ifr_cssrain");  
        var e_html = ifr_cssrain.createElement("html");
        var e_body = ifr_cssrain.createElement("body");
        e_body.style.marginLeft = "0px"; 
        e_body.style.marginTop = "0px"; 
        e_body.style.marginBottom = "0px"; 
        e_body.style.marginRight = "0px"; 
        var e_div = ifr_cssrain.createElement("div");
        e_div.id = "divContent"; 
        e_div.style.wordWrap="break-word"; 
        e_div.style.backgroundColor="#aad5ff";
        e_div.style.borderStyle="solid"; 
        e_div.style.borderWidth="1px"; 
        e_div.style.borderColor="#336699"; 
        e_div.style.paddingLeft = "3px"; 
        e_div.style.paddingTop = "3px"; 
        e_div.style.paddingBottom = "3px"; 
        e_div.style.paddingRight = "3px"; 
        e_div.innerHTML = msg; 
        e_body.appendChild(e_div); 
        e_html.appendChild(e_body);      
        ifr_cssrain.body.innerHTML = e_body.innerHTML; 
        var oBody = ifr_cssrain.getElementById("divContent"); 
        var oFrame = document.getElementById("ifr_cssrain"); 
        var oFrDiv = document.getElementById("frDiv_cssrain"); 
        oFrame.style.height = oBody.offsetHeight; 
        //oFrame.style.width = oBody.offsetWidth;
        oFrDiv.style.visibility="visible"; 
/*event.x与event.y问题
说明:IE下,even对象有x,y属性,但是没有pageX,pageY属性;
Firefox下,even对象有pageX,pageY属性,但是没有x,y属性. 
解决方法:
使用mX(mX = event.x ? event.x : event.pageX;)
来代替IE下的event.x或者Firefox下的event.pageX. 
*/
        oFrDiv.style.left =  ((event.x ? event.x : event.pageX)+1)+"px"; 
        oFrDiv.style.top =  ((event.y ? event.y : event.pageY)+1)+"px";  
}
function   getIFrameDocument(aID)   { 
var   rv   =   null;   
if   (document.getElementById(aID).contentWindow){ 
rv   =   document.getElementById(aID).contentWindow.document; 
}   else   { 
//   IE 
rv   =   document.frames[aID].document; 
} 
return   rv; 
} 


/**************
*window.open居中打开.(兼容IE和FF)
*用法：
*<input type=button  onclick="NewWindow('a.html','cssrain','200','200',yes)"/>
**************/
var win = null;
function NewWindow(mypage,myname,w,h,scroll){
LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
settings ='height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable';
win = window.open(mypage,myname,settings);
win.focus();
}


/**************
*大小写金额转换函数。
把数字转成中文 -- “零壹” 这种。
*用法：
小写金额：<input type="text" name="aaa" id="aaa" onkeyup="nst_convert(this)"><br>
大写金额：<input type="text" name="bbb" id="bbb" size=80>
**************/
function convertCurrency(currencyDigits) {
// Constants:
 var MAXIMUM_NUMBER = 99999999999.99;
 // Predefine the radix characters and currency symbols for output:
 var CN_ZERO = "零";
 var CN_ONE = "壹";
 var CN_TWO = "贰";
 var CN_THREE = "叁";
 var CN_FOUR = "肆";
 var CN_FIVE = "伍";
 var CN_SIX = "陆";
 var CN_SEVEN = "柒";
 var CN_EIGHT = "捌";
 var CN_NINE = "玖";
 var CN_TEN = "拾";
 var CN_HUNDRED = "佰";
 var CN_THOUSAND = "仟";
 var CN_TEN_THOUSAND = "万";
 var CN_HUNDRED_MILLION = "亿";
 var CN_SYMBOL = "人民币";
 var CN_DOLLAR = "元";
 var CN_TEN_CENT = "角";
 var CN_CENT = "分";
 var CN_INTEGER = "整";
 
// Variables:
 var integral; // Represent integral part of digit number. 
 var decimal; // Represent decimal part of digit number.
 var outputCharacters; // The output result.
 var parts;
 var digits, radices, bigRadices, decimals;
 var zeroCount;
 var i, p, d;
 var quotient, modulus;
 
// Validate input string:
 currencyDigits = currencyDigits.toString();
 if (currencyDigits == "") {
  alert("Empty input!");
  return "";
 }
 if (currencyDigits.match(/[^,.\d]/) != null) {
  alert("Invalid characters in the input string!");
  return "";
 }
 if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
  alert("Illegal format of digit number!");
  return "";
 }
 
// Normalize the format of input digits:
 currencyDigits = currencyDigits.replace(/,/g, ""); // Remove comma delimiters.
 currencyDigits = currencyDigits.replace(/^0+/, ""); // Trim zeros at the beginning. 
 // Assert the number is not greater than the maximum number.
 if (Number(currencyDigits) > MAXIMUM_NUMBER) {
  alert("Too large a number to convert!");
  return "";
 }
// http://www.knowsky.com/ Process the coversion from currency digits to characters:
 // Separate integral and decimal parts before processing coversion:
 parts = currencyDigits.split(".");
 if (parts.length > 1) {
  integral = parts[0];
  decimal = parts[1];
  // Cut down redundant decimal digits that are after the second.
  decimal = decimal.substr(0, 2);
 }
 else {
  integral = parts[0];
  decimal = "";
 }
 // Prepare the characters corresponding to the digits:
 digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT,CN_NINE);
 radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
 bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
 decimals = new Array(CN_TEN_CENT, CN_CENT);
 // Start processing:
 outputCharacters = "";
 // Process integral part if it is larger than 0:
 if (Number(integral) > 0) {
  zeroCount = 0;
  for (i = 0; i < integral.length; i++) {
   p = integral.length - i - 1;
   d = integral.substr(i, 1);
   quotient = p / 4;
   modulus = p % 4;
   if (d == "0") {
    zeroCount++;
   }
   else {
    if (zeroCount > 0)
    {
     outputCharacters += digits[0];
    }
    zeroCount = 0;
    outputCharacters += digits[Number(d)] + radices[modulus];
   }
   if (modulus == 0 && zeroCount < 4) { 


    outputCharacters += bigRadices[quotient];
   }
  }
  outputCharacters += CN_DOLLAR;
 }
 // Process decimal part if there is:
 if (decimal != "") {
  for (i = 0; i < decimal.length; i++) {
   d = decimal.substr(i, 1);
   if (d != "0") {
    outputCharacters += digits[Number(d)] + decimals[i];
   }
  }
 }
 // Confirm and return the final output string:
 if (outputCharacters == "") {
  outputCharacters = CN_ZERO + CN_DOLLAR;
 }
 if (decimal == "") {
  outputCharacters += CN_INTEGER;
 }
 //outputCharacters = CN_SYMBOL + outputCharacters;
 outputCharacters = outputCharacters;
 return outputCharacters;
}// 
var stmp = "";
function nst_convert(t)
{
   if(t.value==stmp) return;//如果等于上次输入则返回
   var ms = t.value.replace(/[^\d\.]/g,"").replace(/(\.\d{2}).+$/,"$1").replace(/^0+([1-9])/,"$1").replace(/^0+$/,"0");
   //replace(/[^\d\.]/g,"")去掉输入当中不是数字和.的字符
   //replace(/(\.\d{2}).+$/,"$1") 
   //匹配从字符开始的第一个.后面的所有字符,由于没有使用g标记，
   //所以只匹配开始第一次   然后用小数点和后两位进行替换以确定数值最后的格式正确 高.
   //replace(/^0+([1-9])/,"$1") 匹配以多个0开头的数值替换为去掉0后的数值做为数字的第一位 也是匹配开始的一次.
   //replace(/^0+$/,"0") 匹配以0开始和结束的多个0为一个0 也就是0000000 输入->转换成一个0
   //以下确定输入的为过滤后的合法数字
   //alert(ms);
   var txt = ms.split(".");
   //alert(txt[0]);
   //如果ms值不小数点存在则txt[0]=小数点前的值否则等于ms
   //regexp:/\d{4}(,|$)/ 匹配四位数字和,的集合或者四位数字和字符结尾的集合
   while(/\d{4}(,|$)/.test(txt[0]))//如果为txt[0]=4123
     txt[0] = txt[0].replace(/(\d)(\d{3}(,|$))/,"$1,$2");
   //txt[0].replace(/(\d)(\d{3}(,|$))/,"$1,$2")是将txt[0]进行替换后再赋给它
   //regexp:/(\d)(\d{3}(,|$))/ 将四个数字份为两组第一个数字为第一位，后三位和其他结尾为每二位
   //并替换成 第一位,第二位 注意 ,的使用很好.   也就是将4123先替换成4,123
   //由于此表达式默认采用贪婪匹配所以从数值后向前匹配再通过循环进行再匹配替换从而可以将
   //12345678分成你想要的123,456,78 楼主彩用(,|$)很精典，因为它略去了第二次匹配时的,问题
   t.value = stmp = txt[0]+(txt.length>1?"."+txt[1]:"");
   //最终赋值到输入框中  
   //如果有小数点则加上并购成最终数字否则显示替换后的txt[0]
   bbb.value = convertCurrency(ms-0);
   //将ms转换为数字送到number2num1去转换
}




/**********
简单的实时时间显示.
<body onload="startclock()">
<form name="clock">
<script language="JavaScript">
var timerID = null;
var timerRunning = false;
function stopclock (){
if(timerRunning)
clearTimeout(timerID);
timerRunning = false;}
function startclock () {
stopclock();
showtime();}
function showtime () {
var now = new Date();
var hours = now.getHours();
var minutes = now.getMinutes();
var seconds = now.getSeconds()
var timeValue = now.getYear()+"年"+(now.getMonth()+1)+"月"+now.getDate()+"日" +((hours >= 12) ? " 下午 " : " 上午 " )
timeValue += ((hours >12) ? hours -12 :hours)
timeValue += ((minutes < 10) ? ":0" : ":") + minutes
timeValue += ((seconds < 10) ? ":0" : ":") + seconds
document.clock.thetime.value = timeValue;
timerID = setTimeout("showtime()",1000);
timerRunning = true;}
</script>
<input name="thetime" style="font-size:9pt;color:#000000;border:1px solid #FFFFFF;" size="28">
</form>
*/




/* pengpeng滚动组件 */
/*
组件注意地方：滚动的部分高度或宽度要高于滚动框架的高度或宽度。调用方式放在Html架构代码下方。
关于w_demo的问题，由于横向滚动的时候需要调整整体的宽度，所以要多套一层框架。
<script language="JavaScript" type="text/javascript" src="ppRoll.js"></script>
(上下）
<div id="demo">
	<div id="demo1">
	滚动主题
	</div>
	<div id="demo2">
	</div>
</div>
（左右）
<div id="demo">
<table border=0 cellspacing=0 cellpadding=0>
    <tr>
      <td id="demo1">滚动内容(注意横向滚动内容的东西里一定要有宽度，比如嵌入一table，一定要让它有宽度)</td>
      <td id="demo2"></td>
    </tr>
  </table>
</div>
//调用方式
<script type="text/javascript">
var ppRoll = new ppRoll({
					speed:60, 		//速度
					demo:"demo",	//外框架div
					demo1:"demo1",	//滚动主体div
					demo2:"demo2",	//复制的div
					objStr:"ppRoll",	//创建的对象名
					width:"192px",	//外框架demo的宽度
					height:"360px",	//外框架demo的高度
					direction:"top"	//滚动方向，可选值：top、down、left、right
					});
</script>
*/
function ppRoll(a)
{
	this.myA = a;
	this.myA.IsPlay = 1;
	this.$(a.demo).style.overflow = "hidden";
	this.$(a.demo).style.width = a.width;
	this.$(a.demo).style.height = a.height;
	this.$(a.demo2).innerHTML=this.$(a.demo1).innerHTML;
	this.$(a.demo).scrollTop=this.$(a.demo).scrollHeight;
	this.Marquee();
	this.$(a.demo).onmouseover=function() {eval(a.objStr+".clearIntervalpp();");}
	this.$(a.demo).onmouseout=function() {eval(a.objStr+".setTimeoutpp();")}
}
ppRoll.prototype.$ = function(Id)
{
	return document.getElementById(Id);
}
ppRoll.prototype.getV = function(){ 
alert(this.$(this.myA.demo2).offsetWidth-this.$(this.myA.demo).scrollLeft);
alert(this.$(this.myA.demo2).offsetWidth);
alert(this.$(this.myA.demo).scrollLeft);}
ppRoll.prototype.Marquee = function()
{
	this.MyMar=setTimeout(this.myA.objStr+".Marquee();",this.myA.speed);
	if(this.myA.IsPlay == 1)
	{
		//向上滚动
		if(this.myA.direction == "top")
		{
			if(this.$(this.myA.demo).scrollTop>=this.$(this.myA.demo2).offsetHeight)
				this.$(this.myA.demo).scrollTop-=this.$(this.myA.demo2).offsetHeight;
			else{
				this.$(this.myA.demo).scrollTop++;
			}
		}
		//向下滚动
		if(this.myA.direction == "down")
		{
			if(this.$(this.myA.demo1).offsetTop-this.$(this.myA.demo).scrollTop>=0)
				this.$(this.myA.demo).scrollTop+=this.$(this.myA.demo2).offsetHeight;
			else{
				this.$(this.myA.demo).scrollTop--;
			}
		}
		//向左滚动
		if(this.myA.direction == "left")
		{
			if(this.$(this.myA.demo2).offsetWidth-this.$(this.myA.demo).scrollLeft<=0)
				this.$(this.myA.demo).scrollLeft-=this.$(this.myA.demo1).offsetWidth;
			else{
				this.$(this.myA.demo).scrollLeft++;
			}
		}
		//向右滚动
		if(this.myA.direction == "right")
		{
			if(this.$(this.myA.demo).scrollLeft<=0)
				this.$(this.myA.demo).scrollLeft+=this.$(this.myA.demo2).offsetWidth;
			else{
				this.$(this.myA.demo).scrollLeft--;
			}
		}

	}
}
ppRoll.prototype.clearIntervalpp = function()
{
	this.myA.IsPlay = 0;
}
ppRoll.prototype.setTimeoutpp = function()
{
	this.myA.IsPlay = 1;
}


/**************
*双击鼠标滚动屏幕的代码.(兼容IE和FF)
*用法:直接嵌入js，就可以用了。
**************/
var scroll_currentpos,scroll_timer;
function scroll_initialize()
{
scroll_timer=setInterval ("scrollwindow ()",30);
}
function scroll_sc()
{
clearInterval(scroll_timer);
}
function scrollwindow()
{
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




/**************
根据年和月取当月的最后一天.（也就是当月有多少天）
用法：
var a =getLastDay(2008,5);
alert(a); //  31
**************/
function getLastDay(year,month)
{
 //取年
 var new_year = year;
 //取到下一个月的第一天,注意这里传入的month是从1～12 
 var new_month = month++;
 //如果当前是12月，则转至下一年
 if(month>12)
 {
  new_month -=12;
  new_year++;
 }
 var new_date = new Date(new_year,new_month,1);
 return (new Date(new_date.getTime()-1000*60*60*24)).getDate();
}




/**************
*获取上一页的来源。
*注意此方法在本地上测试是为空。
必须放到服务器上，才有用。
**************/
function check_referrer(){
   var url=document.referrer; //document.referrer是上一页的来源
   var p=url.toLowerCase().indexOf("cssrain.cn");
   if(p>=0){
   }else{
   }
}



/**************
创建用于ajax技术的 XMLHttpRequest对象。
用法：
try{
createXMLHttpRequest();   
xmlHttp_siteTotal.open("POST", url);    
xmlHttp_siteTotal.send(xml);   
}catch(e) {
}
**************/
var xmlHttp_siteTotal;
function createXMLHttpRequest() {
    if(window.XMLHttpRequest) {
            xmlHttp_siteTotal = new XMLHttpRequest();    
    }else if(window.ActiveXObject) {
            xmlHttp_siteTotal = new ActiveXObject("Microsoft.XMLHTTP");    
    }
}



/*
或其显示的高度和宽度：
 必须等页面加载完后，才能获取。 onload后、
*/
// 获取显示高度
function getViewportHeight() {
	if (window.innerHeight!=window.undefined) return window.innerHeight;
	if (document.compatMode=='CSS1Compat') return document.documentElement.clientHeight;
	if (document.body) return document.body.clientHeight; 
	return window.undefined; 
}
// 获取显示宽度
function getViewportWidth() {
	if (window.innerWidth!=window.undefined) return window.innerWidth; 
	if (document.compatMode=='CSS1Compat') return document.documentElement.clientWidth; 
	if (document.body) return document.body.clientWidth; 
	return window.undefined; 
}

 
/*
对表单中  textarea  中的空格 和 换行处理。
*/
 function convertToHtml(str)
{
	var re;
	re  = / /g;
	str = str.replace(re,"&nbsp;");
	re  = /\r\n/g;
	str = str.replace(re,"<br>");
	return str;
}
function makeToHtml(formName)
{
	var form;
	form = eval(formName);
	for(i=0;i<form.elements.length;i++)
		if(form.elements[i].type=="textarea")
			{
             form.elements[i].value = convertToHtml(form.elements[i].value);
           }
}

 
/*
得到Form数据，以 & 号 拼接起来。
在ajax传递数据中，经常用到这个方法。
用法:
 <form id="cs">
   <input type="text" name="aa" value="aa"/>
   <input type="text" name="bb"  value="bb"/>
   <textarea name="cc">cc</textarea>
   <input type="button" value="test" name="btn" onclick="alert(  formdata('cs')  )" />
 </form>
*/
function formdata(formN){
var str=""
for(i=0;i<document.forms[formN].elements.length;i++){
 if(document.forms[formN].elements[i].type!="button")
  { //这里可以根据需求，来判断那些类型不要
   var e = document.forms[formN].elements[i];
   str+=e.name+"="+e.value+"&"
  }
}
str=str+"date="+new Date().getTime();
return str;
}


/*
字符串连接操作类
类似java里的。
用法：
var str=new StringBuilder();
str.append("my ").append("name ").append("is ").append("cssrain! ");
alert( str.toString() );
*/
function StringBuilder(sString){ 
        this.length=0;
        this.append=function(sString){
  this.length+=(this._parts[this._current++]=String(sString)).length;
                this._string=null;
                return this;
                }
        this.toString=function(){
                if(this._string!=null)
                        return this._string;
                var s=this._parts.join("");
                this._parts=[s];
                this._current=1;
                return this._string=s;
                }
        this._current=0;
        this._parts=[];
        this._string=null;
        if(sString!=null)
        this.append(sString);
		}


/*
//判断两个object的值是不是相同
用法：
var   a=new   Object();   
a["1"]="1"   
a["2"]="2"   
var   b=new   Object();   
b["1"]="1"   
b["2"]="2"   
var   c=new   Object();   
c["1"]="2"   
c["2"]="3"   
alert(a.compare(b))   
alert(a.compare(c))   
*/
function   Object.prototype.compare(obj){   
for(elements   in   this){   
if(this[elements]   !=   obj[elements])   
return   false   
}   
return   true   
}  

/*
//得到选中的多选框值的Array
用法：
window.onload = function(){
    var a = document.getElementsByName("a");
	var get_a =  getCheckBoxArray(a);
    alert(get_a +  " |  "  + get_a[1] )
}
<input type="checkbox" value="1" name="a" checked/>
<input type="checkbox" value="2" name="a" />
<input type="checkbox" value="3" name="a" checked/>
*/
function getCheckBoxArray(element){
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
}
