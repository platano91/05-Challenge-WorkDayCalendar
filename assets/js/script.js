// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Add a listener for click events on the save button
  $('.saveBtn').on('click', function () {
    var timeBlockId = $(this).closest('.time-block').attr('id');
    var hour = timeBlockId.split('-')[1];
    var userInput = $(this).siblings('.description').val();
    localStorage.setItem(hour, userInput);
  });
  // Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour
  var currentHour = dayjs().hour();
  $('.time-block').each(function () {
    var blockHour = parseInt($(this).attr('id').split('-')[1]);
    if (blockHour < currentHour) {
      $(this).removeClass('future present').addClass('past');
    } else if (blockHour === currentHour) {
      $(this).removeClass('past future').addClass('present');
    } else {
      $(this).removeClass('past present').addClass('future');
    }
  });
  // Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements
  $('.time-block').each(function () {
    var hour = $(this).attr('id').split('-')[1];
    var savedInput = localStorage.getItem(hour);
    if (savedInput) {
      $(this).find('.description').val(savedInput);
    }
  });
  // Add code to display the current date in the header of the page
  var currentDate = dayjs().format('MMMM D, YYYY');
  $('#currentDay').text(currentDate);
});
