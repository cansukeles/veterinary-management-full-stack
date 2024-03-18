export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// format dates for backend requests
export const formatDateForTable = (dateParam, showHours = true) => {
  const date = new Date(dateParam);

  // Get the day of the week, month, day, year, hours, and minutes
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Construct the formatted date string
  if (showHours) {
    return `${dayOfWeek} ${month} ${day} ${year} ${hours}:${minutes}`;
  } else {
    return `${dayOfWeek} ${month} ${day} ${year}`;
  }
};
