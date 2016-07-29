app.filter("dateFilter", () => input => {
  var timeSince = Date.now() - input,
    one = {
      second: 1000,
      minute: 60 * 1000,
      hour: 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000
    };

  function pluralize(type){
    var num = Math.floor(timeSince / one[type]),
      type = num === 1 ? type : type + "s";
    return `${num} ${type} ago`;
  }

  if(timeSince > one.day) return pluralize("day");
  if(timeSince > one.hour) return pluralize("hour");
  if(timeSince > one.minute) return pluralize("minute");
  if(timeSince > one.second) return pluralize("second");
  return "just now";
});
