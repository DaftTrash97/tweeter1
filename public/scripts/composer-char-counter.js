$(document).ready(function() {
  // Attach an input event listener to the tweet textarea
  $(".new-tweet form textarea").on("input", function() {
    // Get the current length of the tweet text
    let tweetLength = $(this).val().length;

    // Define the maximum tweet length
    let maxTweetLength = 140;

    // Calculate the remaining characters allowed
    let remainingChars = maxTweetLength - tweetLength;

    // Find the counter element associated with the current textarea
    let counterElement = $(this).closest(".new-tweet").find(".counter");

    // Update the counter to display remaining characters
    counterElement.text(remainingChars);

    // Change counter text color to red if remaining characters are negative
    if (remainingChars < 0) {
      counterElement.css("color", "red");
    } else {
      // Reset counter text color to default
      counterElement.css("color", "");
    }
  });
});