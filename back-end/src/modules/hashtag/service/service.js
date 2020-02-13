import twitter_config from '../../../config/twitter-config'

export var lista_tweets = [];

export const parameters = {
  track: "#flamengo,#festabbb,#BBBB20",        
};

export const  stream = () => {
  twitter_config.stream('statuses/filter', 
  parameters, (stream) => {
    stream.on('data', (tweet) =>{
      lista_tweets.push(tweet);
      console.log(tweet)
    });
    stream.on('error', (error) => {
      res.send(error)
    });
    setTimeout(stream.destroy, 5000)   
  })
}

