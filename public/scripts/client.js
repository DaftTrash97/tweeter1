/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
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
      <i class="fa-solid fa-flag fa-xs" style="color: #1148a7;"></i>
      <i class="fa-solid fa-retweet fa-xs" style="color: #1148a7;"></i>
      <i class="fa-solid fa-heart fa-xs" style="color: #1148a7;"></i>
    </footer>
  </article>
`);
  return $tweet;
};

$(document).ready(function () {
  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});