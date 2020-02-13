import express from 'express'
//import twitter_config from '../../../config/twitter-config'
import {lista_tweets, parameters, stream } from '../service/service'
const hashtagRouter = express.Router();
/*
var lista_tweets = [
 
];

const parameters = {
  track: "#flamengo,#festabbb,#BBBB20",        
};

const stream = () => {
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
*/

hashtagRouter.route('/parar').get((req, res) => {  
  res.send('lista_tweets');
});

hashtagRouter.route('/buscar').get( (req, res)  =>{
  //stream();
  console.log(parameters.track)  
  res.send('ok2') 
});

export default hashtagRouter;
