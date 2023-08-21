/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweets) {
  for (const tweetData of tweets) {
    const $tweet = createTweetElement(tweetData);
    $('#tweets-container').append($tweet);
  }
}

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
      <p>${content.text}</p>
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

const loadTweets = function () {
  $.get('/tweets', function (tweets) {
    renderTweets(tweets);
  });
}

$(document).ready(function () {
  loadTweets();

  $('form').submit(function (event) {
    event.preventDefault();

    const tweetText = $('#tweet-text').val();

    if (!tweetText) {
      alert("Tweet cannot be empty");
      return;
    }

    if (tweetText.length > 140) {
      alert("Tweet is too long");
      return;
    }
    console.log($(this).serialize())
    $.post('/tweets', $(this).serialize(), function (response) {
      loadTweets();
    });
  });
});