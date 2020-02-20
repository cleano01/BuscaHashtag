import twitter_config from '../../../config/twitter-config'

export var lista_tweets = [];

export const parameters = {
  track: "#RaspemOSovaco,#bbb,#BBB",        
};
export const  stream = () => {
  twitter_config.stream('statuses/filter', 
  parameters, (stream) => {
    //console.log(parameters)
    //console.log('----------------')
    console.log('aqui')
    stream.on('data', (tweet) =>{
      lista_tweets.push(tweet);
      console.log(tweet)
    });
    stream.on('error', (error) => {
      res.send(error)
    });
    setTimeout(stream.destroy, 10000)   
  })
}
/*
export  let  stream =  () => {
    twitter_config.stream('statuses/filter', 
    parameters, (stream) => {
      //console.log(parameters)
      //console.log('----------------')
      console.log('aqui')

      stream.on('data',  (tweet) =>{
        
          lista_tweets.push(tweet);      
          cont++;     
          console.log("$$$$$ ", cont)
          console.log(tweet)  
          
 
        
        cont++
        if(cont == 3){
          console.log('############### 3')
         }
               
      });
  
      stream.on('error', (error) => {
        console.log(error)
      });
      //setmeout(stream.destroy, 6000);  
    } )

  stream = undefined;

  return lista_tweets

}
*/

