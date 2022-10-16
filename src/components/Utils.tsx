/**
 * Time formatter for weather widget
 * @param time - JS Date
 * @returns a nicely formatted time of the form Sat 15th 6:19PM
 */
export const formatTimeForWeather = (time: Date) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const getTh = (val: number) => {
    return val > 3 ? "th" : val === 1 ? "st" : val === 2 ? "nd" : "rd";
  };
  const d = new Date(time);
  const day = days[d.getDay()];
  const hr = d.getHours();
  const min = `${d.getMinutes() < 10 ? "0" : ""}${d.getMinutes()}`;
  const ampm = hr > 12 ? "PM" : "AM";
  const hrVal = hr > 12 ? hr - 12 : hr;

  var date = d.getDate();
  return `${day} ${date}${getTh(date)} ${hrVal}:${min} ${ampm}`;
};
