export function findMissingDates(dateList, startDateStr, endDateStr) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const excludedDates = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split('T')[0];
    if (!dateList.includes(dateString)) {
      excludedDates.push(dateString);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return excludedDates;
}

export function compareTime(time1, time2) {
  function timeStringToMinutes(timeString) {
    const [hour, minute] = timeString.split(":").map((value) => Number(value));
    return hour * 60 + minute;
  }
  let timea = timeStringToMinutes(time1)
  let timeb = timeStringToMinutes(time2)
 return timea-timeb
}

export function getDatetime(dateTimeString) {
  const dateObj = new Date(dateTimeString);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const hour = String(dateObj.getHours()).padStart(2, '0');
  const minute = String(dateObj.getMinutes()).padStart(2, '0');
  const second = String(dateObj.getSeconds()).padStart(2, '0');

  const datetime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  return datetime;
}


// 写一个函数将"2023-11-18T03:24:56"格式的日期转换为"2023-11-18 03:24:56"格式的日期
export function convertDateFormat(dateStr) {
  // 将T替换为空格
  var newDateStr = dateStr.replace("T", " ");
  return newDateStr;
}


