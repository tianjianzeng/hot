/*后台接口访问地址域名*/
var interfaceUrl = "http://localhost:8080/BuguAPI/api";
var pageSize = 20;
$(function () {
	jQuery.support.cors = true;
	/**
	 * ajax封装
	 * url 发送请求的地址
	 * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
	 * async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
	 *    注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
	 * type 请求方式("POST" 或 "GET")， 默认为 "GET"
	 * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
	 * successfn 成功回调函数
	 * errorfn 失败回调函数
	 */
	/**
	 * ajax封装
	 * url 发送请求的地址
	 * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
	 * successfn 成功回调函数
	 */
	jQuery.postJson = function (url, data, successfn, ajaxParam) {
	    if (ajaxParam == undefined) {
	        ajaxParam = {
	            contentType: "application/json;charset=utf-8",
	            dataType: "json",
	            async: true,
	            isLoading:true
	        }
	    }
	    else {
	        if (ajaxParam.contentType == undefined) {
	            ajaxParam.contentType = "application/json;charset=utf-8";
	        }
	        if (ajaxParam.dataType == undefined) {
	            ajaxParam.dataType = "json";
	        }
	        if (ajaxParam.async == undefined) {
	            ajaxParam.async = true;
	        }
	        if (ajaxParam.isLoading == undefined || ajaxParam.isLoading) {
	            ajaxParam.isLoading = true;
	           
	        }
	    }
	    if (ajaxParam.isLoading)
	    {
             showLoading(true);
	    }
	    $.ajax({
	        type: "post",
	        data: data,
	        contentType: ajaxParam.contentType,
	        url: interfaceUrl + "/"+url,
	        dataType: ajaxParam.dataType,
	        async: ajaxParam.async,
	        success: function (d) {
	            if (ajaxParam.isLoading) {
	                showLoading(false);
	            }
	            successfn(d);
	        },
	        error: function (XMLHttpRequest, textStatus, errorMsg) {
	            if (ajaxParam.isLoading) {
	                showLoading(false);
	            }
	            if (ajaxParam.error!=undefined) {
	                ajaxParam.error(errorMsg);
	            }
	            $.showPopup("可能由于网络原因操作失败，请刷新后再重试")
	        }
	    });
	};

	//日志
	jQuery.log = function (type, subType, content, platform, url, userId, userName, postUrl) {
        
	    var rUrl = InterfaceUrl + "/Common/Log?ran=" + Math.random();
	    if (!isNullOrEmpty(postUrl)) {
	        rUrl = postUrl;
	    }
	    var data = { "id": decodeURIComponent(userId), "type": type, "subType": subType, "systemType": 0, "platform": platform, "content": content, "url": url }
		$.postJson(rUrl, data, function () {

		});
	};
	/** post 文件数据
	* ajax封装
	* url 发送请求的地址
	* data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
	* successfn 成功回调函数
	*/
	jQuery.ajaxFile = function (obj) {
		$.ajax({
			type: "post",
			data: obj.data,
			url: InterfaceUrl + "/" + obj.url,
			cache: false,
			async: obj.async == null ? true : false,
			processData: false,
			contentType: false,
			dataType: "json",
			success: function (d) {
				obj.success(d);
			},
			error: function (XMLHttpRequest, textStatus, errorMsg) {
				$.popupMsg(errorMsg);
			}
		});
	};
	
	//jQuery.dragPage = function (id, fn) {
	//    var lastTouchY = 0;
	//    $(id).on('touchstart', function (e) {
	//        var touch = e.originalEvent.targetTouches[0];
	//        lastTouchY = touch.pageY;
	//    });
	//    $(id).on('touchend', function (e) {
	//        var touch = e.originalEvent.changedTouches[0];
	//        if (touch.pageX - lastTouchY < 0) {//向上滑动，加载新分页
	//            var scrollPos = $(window).scrollTop(), parentHeight = $(window).height(); //滚动条距离顶部的位置、容器高度
	//            var bodyHeight = $(id).height();
	//            var canLoad = parentHeight + scrollPos > bodyHeight;
	//            if (canLoad == false && parentHeight + scrollPos == bodyHeight)
	//                canLoad = Math.abs(touch.pageX - lastTouchY) > 2;
	//            if (canLoad) {
	//                fn();
	//            }
	//        }
	//    });
	//}
});

; (function ($) {
	$.showPopup = function (msg) {

		var setting = {
			id: 'auto',
			type: 'alert',//alert,confirm
			time: 2,
			msg: '正在加载中，请稍后'
		}
		var param = {
			msg: msg
		}
		//合并参数
		option = $.extend(setting, param);
		if (option.id == 'auto') {
			option.id = 'popup' + parseInt(Math.random() * 999999999 + 1);
			while ($("#" + option.id).length > 0) {
				option.id = 'popup' + parseInt(Math.random() * 999999999 + 1);
			}

		}
		var htmlDiv = '<div class="show_popup" id="' + option.id + '">'
			+ '<div class="popup_content">'
				+ '<div class="popup_mask_p" id="' + option.id + 'div">'
				+ '<p>' + option.msg + '</p>'
				+ '</div>'
				+ '</div>'
			+ ' </div>';
		$("body").append(htmlDiv);
		var popupId = option.id;
		var removeTime = option.time * 1000;
		//alert确定
		if (removeTime > 0) {
			setTimeout(
				function () {
					$("#" + popupId).remove();
				}, removeTime);
		}
		//显示当前的窗口
		return $("#" + option.id).show();
	}
}(jQuery))

; (function ($) {
	$.popupMsg = function (msg) {

		var setting = {
			id: 'auto',
			type: 'alert',//alert,confirm
			msg: '正在加载中，请稍后'
		}
		var param = {
			msg: msg
		}
		//合并参数
		option = $.extend(setting, param);
		if (option.id == 'auto') {
			option.id = 'popup' + parseInt(Math.random() * 999999999 + 1);
			while ($("#" + option.id).length > 0) {
				option.id = 'popup' + parseInt(Math.random() * 999999999 + 1);
			}

		}
		var htmlDiv = '<div class="show_popup" id="' + option.id + '">'
			+ '<div class="popup_content">'
				+ '<div class="popup_mask_p" id="' + option.id + 'div">'
				+ '<p>' + option.msg + '</p>'
				+ '</div>'
				+ ' <div class="popup_mask_btn">'
						+ ' <input type="button" id="btnPopupOk' + option.id + '" value="确定" class="define" />'
				+ ' </div>'
				+ '</div>'
			+ ' </div>';
		$("body").append(htmlDiv);
		var popupId = option.id;
		//alert确定
		$("#btnPopupOk" + popupId).click(function () {
			$("#" + popupId).remove();
		});
		//显示当前的窗口
		return $("#" + option.id).show();
	}
}(jQuery))
; (function ($) {
	$.showPopupMsg = function (msg, optionfn) {

		var setting = {
			id: 'auto',
			type: 'alert',//alert,confirm
			msg: '正在加载中，请稍后'
		}
		var param = {
			msg: msg,
			fn: optionfn
		}
		//合并参数
		option = $.extend(setting, param);
		if (option.id == 'auto') {
			option.id = 'popup' + parseInt(Math.random() * 999999999 + 1);
			while ($("#" + option.id).length > 0) {
				option.id = 'popup' + parseInt(Math.random() * 999999999 + 1);
			}

		}
		var htmlDiv = '<div class="show_popup" id="' + option.id + '">'
			+ '<div class="popup_content">'
				+ '<div class="popup_mask_p" id="' + option.id + 'div">'
				+ '<p>' + option.msg + '</p>'
				+ '</div>'
				+ ' <div class="popup_mask_btn">'
						+ ' <input type="button" id="btnPopupSure' + option.id + '" value="确定" class="define" />'
				+ ' </div>'
				+ '</div>'
			+ ' </div>';
		$("body").append(htmlDiv);
		var popupId = option.id;
		//alert确定
		$("#btnPopupSure" + popupId).click(function () {
			$("#" + popupId).remove();
			if (optionfn != null) {
				optionfn();
			}
		});
		//显示当前的窗口
		return $("#" + option.id).show();
	}
}(jQuery))
; (function ($) {
	$.showConfirm = function (msg, textArr, optionfn) {
		var setting = {
			id: 'auto',
			msg: '正在加载中，请稍后',
			textArr: ['确定', '取消']
		}
		var param = {
			msg: msg,
			fn: optionfn,
			textArr: textArr
		}
		//合并参数
		option = $.extend(setting, param);

		if (option.id == 'auto') {
			option.id = 'popup' + parseInt(Math.random() * 999999999 + 1);
			while ($("#" + option.id).length > 0) {
				option.id = 'popup' + parseInt(Math.random() * 999999999 + 1);
			}

		}
		if (option.textArr == null || option.textArr.length != 2) {
			option.textArr = setting.textArr;
		}

		var htmlDiv = '<div class="show_popup" id="' + option.id + '">'
			+ '<div class="popup_content">'
				+ '<div class="popup_mask_p" id="' + option.id + 'div">'
				+ '<p>' + option.msg + '</p>'
				+ '</div>'
				   + ' <div class="popup_mask_btn2">'
							 + ' <input type="button" id="btnPopupCancle' + option.id + '" value="' + textArr[1] + '" class="define" />'
							 + ' <input type="button" id="btnPopupOption' + option.id + '"  value="' + textArr[0] + '" class="define" />'
						+ ' </div>'
				 + '</div>'
			 + ' </div>';
		$("body").append(htmlDiv);
		var popupId = option.id;
		var flag = true;
		//confirm 确定
		$("#btnPopupOption" + popupId).click(function () {
			flag = false
			if (optionfn != null) {
				optionfn(true);
			}
			$("#" + popupId).remove();
		});
		//confirm 取消
		$("#btnPopupCancle" + popupId).click(function () {
			flag = false
			if (optionfn != null) {
				optionfn(false);
			}
			$("#" + popupId).remove();
		});
		//显示当前的窗口
		$("#" + option.id).show();
		//if (flag) {
		//    setTimeout();
		//}
	}
}(jQuery))




var isBusy = false;
function createLoadingDiv() {
	var div = document.createElement("div");
	div.setAttribute("id", "divLoading");
    /*div.setAttribute("style", "position:absolute; left:0; top:0%; width:100%; line-height:10%; height:100%;z-index: 500;");*/
	div.innerHTML = '<div style="display:block; font-size:0.3rem; width:100%; text-align:center;margin-top: 50%;">'
				  + '    <img alt="" src="images/loading_3.gif" class="loading" />'
				  + '</div>';
	document.body.appendChild(div);
}

function showLoading(isVisible) {
	if (isVisible) {
		isBusy = true;
	}

	if (!document.getElementById("divLoading")) {
		createLoadingDiv();
	}
	if (isVisible) {
		document.getElementById("divLoading").style.display = "block";
	} else {
		document.getElementById("divLoading").style.display = "none";
	}

	if (!isVisible) {
		isBusy = false;
	}
}

//是否为空、undefined、空字符串、空格等 为空为true 否 false
function isNullOrEmpty(val) {
	var flag = false;
	if (val == null || val == 'undefined') {
		flag = true;
	}
	else {
		if (val.replace(/(^s*)|(s*$)/g, "").length == 0) {
			flag = true;
		}
	}
	return flag;
}
//获取url中的参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURI(r[2]); return null;
}


String.prototype.trim = function () {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.ltrim = function () {
	return this.replace(/(^\s*)/g, "");
};
String.prototype.rtrim = function () {
	return this.replace(/(\s*$)/g, "");
};
String.prototype.replaceAll = function (find, newStr) {
	return this.replace(new RegExp(find, "gm"), newStr);
};
String.prototype.format = function (args) {
	var result = this.toString();
	var _dic = typeof args === "object" ? args : arguments;
	return result.replace(/\{([^{}]+)\}/g, function (str, key) {
		// return key in _dic ? _dic[key] : str;
		return _dic.hasOwnProperty(key) ? _dic[key] : str;
	});
};
Number.prototype.add = function (arg) {
	var r1, r2, m;
	try { r1 = this.toString().split(".")[1].length } catch (e) { r1 = 0 }
	try { r2 = arg.toString().split(".")[1].length } catch (e) { r2 = 0 }
	m = Math.pow(10, Math.max(r1, r2))
	return (this * m + arg * m) / m
}
Array.prototype.remove = function (val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};


 
// JavaScript Document 
//--------------------------------------------------- 
// 判断闰年 
//--------------------------------------------------- 
Date.prototype.isLeapYear = function () {
	return (0 == this.getYear() % 4 && ((this.getYear() % 100 != 0) || (this.getYear() % 400 == 0)));
};
//--------------------------------------------------- 
// 日期格式化 
// 格式 YYYY/yyyy/YY/yy 表示年份 
// MM/M 月份 
// W/w 星期 
// dd/DD/d/D 日期 
// hh/HH/h/H 时间 
// mm/m 分钟 
// ss/SS/s/S 秒 
//--------------------------------------------------- 
// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，香港服务器， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"H+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};
/** 
* 对Date的扩展，将 Date 转化为指定格式的String 
* 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符 
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
* eg: 
* (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
* (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 
* (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 
* (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 
* (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18 
*/
Date.prototype.pattern = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时 
		"H+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	var week = {
		"0": "/u65e5",
		"1": "/u4e00",
		"2": "/u4e8c",
		"3": "/u4e09",
		"4": "/u56db",
		"5": "/u4e94",
		"6": "/u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
};
//+--------------------------------------------------- 
//| 求两个时间的天数差 日期格式为 YYYY-MM-dd 
//+--------------------------------------------------- 
function daysBetween(DateOne, DateTwo) {
	var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
	var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
	var OneYear = DateOne.substring(0, DateOne.indexOf('-'));

	var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
	var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
	var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));
	var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
	return Math.abs(cha);
}
//+--------------------------------------------------- 
//| 日期计算 
//+--------------------------------------------------- 
Date.prototype.DateAdd = function (strInterval, Number) {
	var dtTmp = this;
	switch (strInterval) {
		case 's':
			return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds() + Number); //秒 
		case 'n':
			return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes() + Number, dtTmp.getSeconds()); //分 
		case 'h':
			return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()), dtTmp.getDate(), dtTmp.getHours() + Number, dtTmp.getMinutes(), dtTmp.getSeconds()); //时 
		case 'd':
			return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()), dtTmp.getDate() + Number, dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); //天 
		case 'w':
			return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()), dtTmp.getDate() + Number * 7, dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); //周 
		case 'q':
			return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); //季度 
		case 'm':
			return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); //月 
		case 'y':
			return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); //年 
	}
};
//+--------------------------------------------------- 
//| 比较日期差 dtEnd 格式为日期型或者 有效日期格式字符串 
//+--------------------------------------------------- 
Date.prototype.DateDiff = function (strInterval, dtEnd) {
	var dtStart = this;
	if (typeof dtEnd == 'string') //如果是字符串转换为日期型 
	{
		dtEnd = StringToDate(dtEnd);
	}
	switch (strInterval) {
		case 's':
			return parseInt((dtEnd - dtStart) / 1000);
		case 'n':
			return parseInt((dtEnd - dtStart) / 60000);
		case 'h':
			return parseInt((dtEnd - dtStart) / 3600000);
		case 'd':
			return parseInt((dtEnd - dtStart) / 86400000);
		case 'w':
			return parseInt((dtEnd - dtStart) / (86400000 * 7));
		case 'm':
			return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
		case 'y':
			return dtEnd.getFullYear() - dtStart.getFullYear();
	}
};
//+--------------------------------------------------- 
//| 日期输出字符串，重载了系统的toString方法 
//+--------------------------------------------------- 
Date.prototype.toString = function (showWeek) {
	var myDate = this;
	var str = myDate.toLocaleDateString();
	if (showWeek) {
		var Week = ['日', '一', '二', '三', '四', '五', '六'];
		str += ' 星期' + Week[myDate.getDay()];
	}
	return str;
};
//+--------------------------------------------------- 
//| 日期合法性验证 
//| 格式为：YYYY-MM-DD或YYYY/MM/DD 
//+--------------------------------------------------- 
function IsValidDate(DateStr) {
	var sDate = DateStr.replace(/(^\s+|\s+$)/g, ''); //去两边空格; 
	if (sDate == '') return true;
	//如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为'' 
	//数据库中，免备案空间，美国服务器，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式 
	var s = sDate.replace(/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g, '');
	if (s == '') //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D 
	{
		var t = new Date(sDate.replace(/\-/g, '/'));
		var ar = sDate.split(/[-/:]/);
		if (ar[0] != t.getYear() || ar[1] != t.getMonth() + 1 || ar[2] != t.getDate()) {
			return false;
		}
	} else {
		return false;
	}
	return true;
}
//+--------------------------------------------------- 
//| 日期时间检查 
//| 格式为：YYYY-MM-DD HH:MM:SS 
//+--------------------------------------------------- 
function CheckDateTime(str) {
	var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/;
	var r = str.match(reg);
	if (r == null) return false;
	r[2] = r[2] - 1;
	var d = new Date(r[1], r[2], r[3], r[4], r[5], r[6]);
	if (d.getFullYear() != r[1]) return false;
	if (d.getMonth() != r[2]) return false;
	if (d.getDate() != r[3]) return false;
	if (d.getHours() != r[4]) return false;
	if (d.getMinutes() != r[5]) return false;
	if (d.getSeconds() != r[6]) return false;
	return true;
}
//+--------------------------------------------------- 
//| 把日期分割成数组 
//+--------------------------------------------------- 
Date.prototype.toArray = function () {
	var myDate = this;
	var myArray = Array();
	myArray[0] = myDate.getFullYear();
	myArray[1] = myDate.getMonth();
	myArray[2] = myDate.getDate();
	myArray[3] = myDate.getHours();
	myArray[4] = myDate.getMinutes();
	myArray[5] = myDate.getSeconds();
	return myArray;
};
//+--------------------------------------------------- 
//| 取得日期数据信息 
//| 参数 interval 表示数据类型 
//| y 年 m月 d日 w星期 ww周 h时 n分 s秒 
//+--------------------------------------------------- 
Date.prototype.DatePart = function (interval) {
	var myDate = this;
	var partStr = '';
	var Week = ['日', '一', '二', '三', '四', '五', '六'];
	switch (interval) {
		case 'y':
			partStr = myDate.getFullYear();
			break;
		case 'm':
			partStr = myDate.getMonth() + 1;
			break;
		case 'd':
			partStr = myDate.getDate();
			break;
		case 'w':
			partStr = Week[myDate.getDay()];
			break;
		case 'ww':
			partStr = myDate.WeekNumOfYear();
			break;
		case 'h':
			partStr = myDate.getHours();
			break;
		case 'n':
			partStr = myDate.getMinutes();
			break;
		case 's':
			partStr = myDate.getSeconds();
			break;
	}
	return partStr;
};
//+--------------------------------------------------- 
//| 取得当前日期所在月的最大天数 
//+--------------------------------------------------- 
Date.prototype.MaxDayOfDate = function () {
	var myDate = this;
	var ary = myDate.toArray();
	var date1 = (new Date(ary[0], ary[1] + 1, 1));
	var date2 = date1.dateAdd(1, 'm', 1);
	var result = dateDiff(date1.Format('yyyy-MM-dd'), date2.Format('yyyy-MM-dd'));
	return result;
};
//+--------------------------------------------------- 
//| 字符串转成日期类型 
//| 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd 
//+--------------------------------------------------- 
function dateToString(jsondate, format,nstring) {
    if (jsondate == null || jsondate == "" || jsondate == undefined) {
        if (nstring == undefined || nstring != null || jsondate == "") {
            return "";
        }
        return nstring;
    }
    //jsondate = jsondate.replace("/Date(", "").replace(")/", "");
    //if (jsondate.indexOf("+") > 0) {
    //    jsondate = jsondate.substring(0, jsondate.indexOf("+"));
    //} else if (jsondate.indexOf("-") > 0) {
    //    jsondate = jsondate.substring(0, jsondate.indexOf("-"));
    //}
    var date = new Date(parseInt(jsondate, 10));
    if (format == null || format == "" || format == undefined) {
        format = "yyyy-MM-dd";
    }
    return date.Format(format);
}
//日期转换
function dateConvertSpectialFormat(datestr) {//datestr格式yyyy-MM-dd
    var reportDate = new Date(datestr);
    var currentDate = new Date();
    if (currentDate < reportDate) {
        return reportDate.Format("yyyy-MM-dd HH:mm");

    }
    else if (currentDate.getFullYear() > reportDate.getFullYear()) {
        return reportDate.Format("yyyy-MM-dd HH:mm");
    }
    else if (currentDate.getMonth() > reportDate.getMonth()) {
        return reportDate.Format("MM-dd HH:mm");
    }
    else if (currentDate.getDate() > reportDate.getDate() + 1) {
        return reportDate.Format("MM-dd HH:mm");
    }
    else if (currentDate.getDate() == reportDate.getDate() + 1) {
        return "昨天 " + reportDate.Format("HH:mm");
    }
    else if (currentDate.getDate() == reportDate.getDate()) {
        if (reportDate.getHours() < 12) {
            return "上午 " + reportDate.Format("HH:mm");
        }
        else {
            return "下午 " + reportDate.Format("HH:mm");
        }

    }
    else {
        return reportDate;
    }
}
//function openPage(pageUrl) {
//	if (isIOS) {
//		window.open(pageUrl, "_self");
//	} else if (isAndroid) {
//		window.location.href = pageUrl;
//	} else {
//		window.location.href = pageUrl;
//	}
//}
//格式化金额
function fmoney(s, n) {
	var fff = "";
	if (s < 0) {
		fff = "-";
		s = s * (-1);
	}
	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
	t = "";
	for (i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return fff + t.split("").reverse().join("") + "." + r;
}

//使用本地缓存
function setLocalCache(key, value) {
    localStorage[key.toLowerCase()] =  value;
}
function getLocalCache(key) {
    return localStorage[key.toLowerCase()];
}
//cookie过期时间-7天*100
window.cookieExpires = 7 * 100;

function setCookie(key, value) {
	$.cookie(key, value, { expires: window.cookieExpires, path: '/' });
}
function setCookieWithExpires(key, value, expires) {
    $.cookie(key, value, { expires: expires, path: '/' });
}
//移除
function removeCookie(key) {
	$.cookie(key, null);
}

function getCookie(key) {
	var cookie = $.cookie(key);
	if (!cookie || cookie == 0) {
		return "";
	} else {
		return cookie;
	}
}
//验证email的合法性  
function is_email(email) {
	if (! /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(email)) {
		return false;
	}
	return true;
}
function isNumber(value) {
    var patrn = /^(-)?\d+(\.\d+)?$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}
function checkFloatNum(str) {
    var reg_zs = /^([1-9][0-9]*|0)(\.[0-9]+)*$/i;
    if (!reg_zs.test(str)) {
        return false;
    }
    return true;

}

//function initInputType(id) {
//    if (isIOS) {
//        document.getElementById(id).type = "number";
//    } else {
//        document.getElementById(id).type = "tel";
//    }
//}
function ToStringP2(v) {
    if (v != null && v != "") {
        return (v * 100).toFixed(2) + "%";
    } else {
        return '--';
    }
}
//精度丢失问题
//乘法
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
//加法
function add(num1, num2) {
    var r1, r2, m, n;
    try { r1 = num1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = num2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return Number(((num1 * m + num2 * m) / m).toFixed(n));
}
//千位分隔符
function thousandBitSeparator(num) {
    var re = /(?=(?!\b)(\d{3})+$)/g;
    return num.toString().replace(re, ',');
}
//$(function () {
//    if (isIOS) {
//        $(document).on('touchend', function () {
//            var e = window.event || e;
//            if (!$(e.target).is("input,select")) {
//                document.activeElement.blur();
//            }
//        });
//    }
//});