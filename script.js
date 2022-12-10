// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

  //Display Current Day and Time
  var timeDisplay = $('#currentDay');

  function displayTime() {
    var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplay.text(rightNow);
  }

$(document).ready (function () {
  //stored varibales
  var currentHour = dayjs().format('HH');
  var schedule = [];
  var hour = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];

  //selector varaibles
  var buttonEl = $(".btn");
  var hourEl = $(".time-block");

  //event listener for save on click
  buttonEl.on("click", function() {
    var saveID = $(this).parent().attr("id");
    var saveText = $(this).siblings(".description").val();
    localStorage.setItem(saveID, JSON.stringify(saveText));

  });

  //get items for schedule
  for (i = 0; i < 9; i++){
    schedule.push(JSON.parse(localStorage.getItem("hour-" + hour[i])));
  }

  //changes style of hour based on time
  $(hourEl).each (function() {
    var id = $(this).attr("id");
    var right = id.slice(-2);
    var text = JSON.parse(localStorage.getItem(id))
    if (text) {
      $(this).children(".description").html(text);
    }
    if (currentHour == right) {
      $(this).addClass("present")
    };
    if (currentHour > right) {
      $(this).addClass("past")
    };
    if (currentHour < right) {
      $(this).addClass("future")
    };
  });
});

displayTime();
setInterval(displayTime, 1000);