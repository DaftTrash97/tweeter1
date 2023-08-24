// Client-side JS logic goes here
// jQuery is already loaded
// Reminder: Use (and do all your DOM work in) jQuery's document ready function

// Render an array of tweet objects to the DOM
const renderTweets = function (tweets) {
  for (const tweetData of tweets) {
    const $tweet = createTweetElement(tweetData);
    $('#tweets-container').prepend($tweet);
  }
};

// Create and return a tweet element based on tweetData
const createTweetElement = function (tweetData) {
  const { user, content, created_at } = tweetData;
  const $tweet = $(`
  <article class="tweet">
    <header>
      <div class="profile-info">
        <img src="${user.avatars}" alt="${user.name} Avatar">
        <h4 class="name">${user.name}</h4>
        <h4 class="username">${user.handle}</h4>
      </div>
    </header>
    <div class="tweet-content">
      <p>${$('<div>').text(content.text).html()}</p>
    </div>
    <footer>
      <div class="icons">
      <i class="fa-solid fa-flag fa-xs" style="color: #1148a7;"></i>
      <i class="fa-solid fa-retweet fa-xs" style="color: #1148a7;"></i>
      <i class="fa-solid fa-heart fa-xs" style="color: #1148a7;"></i>
      </div>
      <time class="timeago">${timeago.format(created_at)}</time>
    </footer>
  </article>
`);
  return $tweet;
};

// Load tweets from the server and render them on the page
const loadTweets = function () {
  $.get('/tweets', function (tweets) {
    renderTweets(tweets);
  });
};

$(document).ready(function () {
  // Load existing tweets when the page is ready
  loadTweets();

  $('form').submit(function (event) {
    event.preventDefault();

    const tweetText = $('#tweet-text').val();

    if (!tweetText.trim()) {
      // Show an error message if the tweet text is empty
      $('#error-container').html('<i class="fa-solid fa-triangle-exclamation" style="color: #e41111;"></i> Tweet cannot be empty <i class="fa-solid fa-triangle-exclamation" style="color: #e41111;">').slideDown();
      return;
    }

    if (tweetText.length > 140) {
      // Show an error message if the tweet is too long
      $('#error-container').html('<i class="fa-solid fa-triangle-exclamation" style="color: #e41111;"></i> Tweet is too long <i class="fa-solid fa-triangle-exclamation" style="color: #e41111;">').slideDown();
      return;
    }

    // Submit the new tweet, clear the textarea, and reset the character counter
    console.log($(this).serialize());
    $.post('/tweets', $(this).serialize(), function (response) {
      loadTweets();
      $('#tweet-text').val('');
      $('.counter').text('140');
    });

    // Hide any existing error messages
    $('#error-container').slideUp();
  });
});