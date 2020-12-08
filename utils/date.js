export function timestampToTime(time) {
	var date = new Date(time) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-'
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
	var D = date.getDate() < 9 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
	var h = date.getHours() < 9 ? '0' + date.getHours() + ':' : date.getHours() + ':'
	var m = date.getMinutes() < 9 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
	var s = date.getSeconds() < 9 ? '0' + date.getSeconds() : date.getSeconds()
	return Y + M + D + h + m + s
}

export function getDate() {
	var date = new Date() //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() // 年
	var M = date.getMonth() + 1 // 月
	var D = date.getDate() // 日
	var h = date.getHours() // 时
	var m = date.getMinutes() // 分
	var s = date.getSeconds() // 秒
	var w = date.getDay() // 周
	return {
		date,
		num: {
			Y,
			M,
			D,
			h,
			m,
			s,
			fullDate: Y + "-" + (M < 9 ? '0' + M : M) + "-" + (D < 9 ? '0' + D : D),
		},
		text: {
			week: '周' + ["一", "二", "三", "四", "五", "六", "日"][w - 1],
			fullDate: Y + "年" + M + "月" + D + "日",
		}
	}
}

// 获取日期
export function getMonday(type, dates) {
	var now = new Date();
	var nowTime = now.getTime();
	var day = now.getDay();
	var longTime = 24 * 60 * 60 * 1000;
	var n = longTime * 7 * (dates || 0);
	if (type == "s") {
		var dd = nowTime - (day - 1) * longTime + n;
	};
	if (type == "e") {
		var dd = nowTime + (7 - day) * longTime + n;
	};
	dd = new Date(dd);
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1;
	var d = dd.getDate();
	m = m < 10 ? "0" + m : m;
	d = d < 10 ? "0" + d : d;
	var day = y + "-" + m + "-" + d;
	return {
		day,
		m,
		d
	};
}

// 获取月天数
export function getMonth(type, months) {
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	if (Math.abs(months) > 12) {
		months = months % 12;
	};
	if (months != 0) {
		if (month + months > 12) {
			year++;
			month = (month + months) % 12;
		} else if (month + months < 1) {
			year--;
			month = 12 + month + months;
		} else {
			month = month + months;
		};
	};
	month = month < 10 ? "0" + month : month;
	var date = d.getDate();
	var firstday = year + "-" + month + "-" + "01";
	var lastday = "";
	if (month == "01" || month == "03" || month == "05" || month == "07" || month == "08" || month == "10" || month ==
		"12") {
		lastday = year + "-" + month + "-" + 31;
	} else if (month == "02") {
		if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
			lastday = year + "-" + month + "-" + 29;
		} else {
			lastday = year + "-" + month + "-" + 28;
		};
	} else {
		lastday = year + "-" + month + "-" + 30;
	};
	var day = "";
	if (type == "s") {
		day = firstday;
	} else {
		day = lastday;
	};
	return day;
}
