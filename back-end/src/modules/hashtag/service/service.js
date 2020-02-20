import twitter_config from '../../../config/twitter-config'

export var lista_tweets = [];

export const parameters = {
  track:'',        
};

export const  stream = () => {
  twitter_config.stream('statuses/filter', 
  parameters, (stream) => {
    console.log(parameters)
    
    stream.on('data', (tweet) =>{
      lista_tweets.push(tweet);
      //console.log(tweet)
      console.log(parameters)

    });
    stream.on('error', (error) => {
      res.send(error)
    });
    setTimeout(stream.destroy, 10000)   
  })
}

