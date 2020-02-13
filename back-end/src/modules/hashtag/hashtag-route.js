import express from 'express'
import twitter_config from '../../config/twitter-config'

const hashtagRouter = express.Router();

var data = [
 
];
const parameters = {
  track: "#flamengo,#festabbb,#BBBB20",        
};

function adc (e){
  console.log('AQUI == ADC')
  data.push(e);
}

const stream = () => {
  twitter_config.stream('statuses/filter', 
  parameters, (stream) => {
      stream.on('data', (tweet) =>{
      adc(tweet);
      console.log(tweet)
    });

    stream.on('error', (error) => {
      console.log(error);
    });

    setTimeout(stream.destroy, 5000)
    
  })
}

hashtagRouter.route('/parar').get((req, res) => {  
     
  console.log('#################################################')
  adc();
  console.log('#################################################')
  res.send(data);
});


hashtagRouter.route('/buscar').get( (req, res)  =>{
  stream();  
  res.send('ok') 
});

export default hashtagRouter;
