export function getWeekday(year, month, date, fullName) {
	const todayDate = new Date(year, month - 1, date);
	if (todayDate.getDay() === 5) return (fullName ? 'Friday' : 'Fri');
	if (todayDate.getDay() === 6) return (fullName ? 'Saturday' : 'Sat');
	if (todayDate.getDay() === 0) return (fullName ? 'Sunday' : 'Sun');
	if (todayDate.getDay() === 1) return (fullName ? 'Monday' : 'Mon');
	if (todayDate.getDay() === 2) return (fullName ? 'Tuesday' : 'Tue');
	if (todayDate.getDay() === 3) return (fullName ? 'Wednesday' : 'Wed');
	if (todayDate.getDay() === 4) return (fullName ? 'Thursday' : 'Thu');
	return 'Unknown';
}

export function getMonthName(month, fullName) {
	const monthNames = fullName ? ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
	];
	return monthNames[month - 1];
}

export function timestamp2String(time) {
	const datetime = new Date();
	datetime.setTime(time * 1000);
	const year = datetime.getFullYear();
	const month = datetime.getMonth() + 1;
	const date = datetime.getDate();
	const hour = datetime.getHours();
	const minute = datetime.getMinutes();
	const second = datetime.getSeconds();
	// let mseconds = datetime.getMilliseconds();
	return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
}

/* prepare a monthly hierarchy from an event array */
export function eventListToHierarchy(eventArray) {
	// create the hierarchy structure on the client
	const monthlyArray = [];
	let currentYear = null;
	let currentMonth = null;
	let currentDate = null;
	for (let i = 0; i < eventArray.length; i++) {
		const event = eventArray[i];

		// new month
		if (currentYear !== event.year || currentMonth !== event.month) {
			monthlyArray.push({ year: event.year, month: event.month, dates: [] });
		}

		// new date
		if (currentYear !== event.year || currentMonth !== event.month || currentDate !== event.date) {
			monthlyArray[monthlyArray.length - 1].dates.push({ date: event.date, events: [] });
		}

		// event
		const dateArrayLength = monthlyArray[monthlyArray.length - 1].dates.length;
		monthlyArray[monthlyArray.length - 1].dates[dateArrayLength - 1].events.push({
			id: event.id,
			text: event.text,
			number: event.number,
			flag: event.flag,
			recurrence: event.recurrence,
			tag: event.tag,
			timestamp: event.timestamp
		});

		// save current date
		currentYear = event.year;
		currentMonth = event.month;
		currentDate = event.date;
	}

	return monthlyArray;
}

export function arrayIndexOf(arr, val) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === val) {
			return i;
		}
	}
	return -1;
}

export function filterList(list, filters) {
	let fList = list;
	const {
		flags,
		tags
	} = filters;

	if (flags.length > 0) {
		fList = fList.filter(item => arrayIndexOf(flags, item.flag) > -1);
	}
	if (tags.length > 0) {
		fList = fList.filter(item => arrayIndexOf(tags, item.tag) > -1);
	}

	return fList;
}

export function isEmpty(object) {
	/* eslint-disable */
	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			return false;
		}
	}
	return true;
	/* eslint-disable */
}

export function arrayRemove(arr, val) {
	const index = arrayIndexOf(arr, val);
	if (index > -1) {
		arr.splice(index, 1);
	}
	return index;
}

export function arrayClear(arr) {
	arr.splice(0, arr.length);
}

/*
Array.prototype.indexOf = function(val) {
for (let i = 0; i < this.length; i++) {
if (this[i] == val) return i;
}
return -1;
};

Array.prototype.remove = function(val) {
let index = this.indexOf(val);
if (index > -1) {
this.splice(index, 1);
}
};
*/
