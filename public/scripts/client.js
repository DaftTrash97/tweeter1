/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

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
      <time class="timeago" datetime="${new Date(created_at)}">${timeago.format(new Date(created_at))}</time>
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

  $("time.timeago").timeago();

  $('form').submit(function (event) {
    event.preventDefault();

    const formData = $(this).serialize();
    console.log(formData);

    $.post('/tweets', formData, function (response) {
      console.log(response);
    });
  });
});