// Time spent on each section of the page

$(document).on('ready', function() {
  var totalScrolled = 0;
  var totalViewed = 0;
  var startTime = Date.now();
  var timeB4Signup = 0;
  var screenHeight = $(document).height();
  var sectionTimes = {};
  var numSections = 10;
  var sectionHeight = screenHeight / numSections;

  // initialize section times so not undefined
  for (var i=0; i<numSections; i++) {
    // +1 so no section 0
    sectionTimes[i] = 0;
  }
  
  $(window).scroll(function() {
    // Total distance scrolled
    var distanceScrolled =  $(document).scrollTop();
    if (totalScrolled < distanceScrolled) {
      totalScrolled = distanceScrolled;
    }

    // Percentage of the page viewed
    var percentViewed = 100 * $(window).scrollTop() / (screenHeight - $(window).height());
    if (percentViewed > totalViewed) {
      totalViewed = percentViewed;
    }
  });

  // Time before clicking the green "Sign Up" button
  $("#signup-button").click(function() {
    var clickedTime = Date.now();
    // Date.now() returns milliseconds. when divided by 1000 it returns seconds
    timeB4Signup = (clickedTime - startTime) / 1000;
    
  });

  // Calls a function or executes a code snippet repeatedly, with a fixed time delay between 
  // each call to that function. Returns an intervalID.
  window.setInterval(function() {
    // console.log("1" + sectionHeight);
    // determine sections 
    var section = Math.ceil($(window).scrollTop() / sectionHeight);

    // add seconds to sectionTimes per section
    sectionTimes[section] += 1;
  }, 1000);

  $("#analytics").click(function() {
    // $(this).modal();

    // $('#info').show();

    // Time spent on page
    var timeSenseStart = (Date.now() - startTime) / 1000;

    $('#analytics-info').html("<li>startTime: " + timeSenseStart + " seconds</li><li>"
      + sectionTimes
      + "</li><li>totalViewed: " + totalViewed
      + "</li><li>totalScrolled: " + totalScrolled
      + "</li><li>timeB4Signup: " + timeB4Signup + "</li>");
  });
});

// makes sections screen height / 10 to make ten sections of page
// starts timer when section is on screen
// stops timer when section is left
// if person goes back to section add to timer
