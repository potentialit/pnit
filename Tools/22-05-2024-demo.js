// Function to convert UTC time to Bangladesh local time
  function getLocalTime(utcDateString) {
    const utcDate = new Date(utcDateString);
    return new Date(utcDate.toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
  }

  function toBengaliNumber(number) {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return number.toString().split('').map(digit => bengaliDigits[parseInt(digit)]).join('');
  }

  // Function to convert each part of the date to Bengali numerals
  function convertDateToBengali(dateString) {
    const [year, month, day] = dateString.split('-').map(toBengaliNumber);
    return `${day}-${month}-${year}`;
  }
  // Function to check if today is a holiday
  function checkHoliday() {
    const today = new Date(); // Get current date and time in UTC
    let isHoliday = false;

    // Convert today's date to Bangladesh local time
    const localDate = getLocalTime(today);

    // Check if today's date falls on a single-day holiday or within a date range
    for (const holiday of holidays) {
      if (holiday.date) {
        const holidayDate = getLocalTime(holiday.date);
        if (localDate.toDateString() === holidayDate.toDateString()) {
          isHoliday = true;
          document.getElementById('holidayInfo').innerHTML = `<p class="text-secondary text-center">আজ ${convertDateToBengali(holiday.date)}ইং তারিখে ${holiday.description} উপলক্ষে ছুটি</p>`;
          break;
        }
      } else if (holiday.dateRangeStart && holiday.dateRangeEnd) {
        const startDate = getLocalTime(holiday.dateRangeStart);
        const endDate = getLocalTime(holiday.dateRangeEnd);
        if (localDate >= startDate && localDate < getNextDay(endDate)) {
          isHoliday = true;
          document.getElementById('holidayInfo').innerHTML = `<p class="text-danger text-center">${convertDateToBengali(holiday.dateRangeStart)} থেকে ${convertDateToBengali(holiday.dateRangeEnd)} পর্যন্ত ${holiday.description} উপলক্ষে ছুটি</p>`;
break;
}
}
}
if (!isHoliday) {
document.getElementById('holidayInfo').innerHTML = `<p class="text-success text-center">আজকে সরকারি বা ঐচ্ছিক কোন ছুটি নেই</p>`;
}
}
function getNextDay(date) {
const nextDay = new Date(date);
nextDay.setDate(nextDay.getDate() + 1);
return nextDay;
}
// Call the function initially
checkHoliday();
// Call the function every 1 minute to check dynamically
setInterval(checkHoliday, 1000 * 60); // 1 minute in milliseconds
