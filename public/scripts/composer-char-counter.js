$(document).ready(function() {
  $(".new-tweet form textarea").on("input", function() {
    let tweetLength = $(this).val().length;
    let maxTweetLength = 140;
    let remainingChars = maxTweetLength - tweetLength;

    let counterElement = $(this).closest(".new-tweet").find(".counter");

    counterElement.text(remainingChars);
  });
});