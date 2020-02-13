import twitter_config from '../../../config/twitter-config'

export var lista_tweets = [];

export const parameters = {
  track: "",        
};

export const  stream = () => {
  twitter_config.stream('statuses/filter', 
  parameters, (stream) => {
    console.log(parameters)
    console.log('----------------')
    stream.on('data', (tweet) =>{
      lista_tweets.push(tweet);
      //console.log(tweet)
    });
    stream.on('error', (error) => {
      res.send(error)
    });
    setTimeout(stream.destroy, 5000)   
  })
}

