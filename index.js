const Twit = require('twit');
const config = require('./config');
const T = new Twit(config);
const translate = require('google-translate-api')

let statusUpdate = {
  status: 'trying once again'
}
const setStatus = function(text){
  statusUpdate.status = text
}

const postNow =   function(){
    return T.post('statuses/update', statusUpdate, function(err, data, response) {
    if(err){console.log(err)}
    console.log('posted')
  })}

let storeTweet;
let tweetThis;
let users = '@POTUS, @realDonaldTrump, @whitehouse, @cnn'

var stream = T.stream('statuses/filter', { follow: ['822215679726100480'], language: 'en' })

stream.on('tweet', function (tweet) {
  if(tweet.user.id == '822215679726100480') {
      storeTweet = tweet.text;

        translate(storeTweet, { to: 'ru' }).then(trns => {
          setStatus('.' + trns.text.slice(0, 138))
          postNow()
          console.log(statusUpdate)
        }).catch(console.log)
      }
  })
