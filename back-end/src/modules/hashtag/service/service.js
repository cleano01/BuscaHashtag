import twitter_config from '../../../config/twitter-config'

export var lista_tweets = [];

export const parameters = {
  track:'',        
};

export const tratemento_hashtag = (lista_hashtag) =>{
  let lista_hashtag_tratada='';

  lista_hashtag.map((elemento)=>{
    
    if(elemento[0] != "#" && elemento != undefined){
      lista_hashtag_tratada += '#'+elemento+','
    }

    else if(elemento != undefined){
      lista_hashtag_tratada += elemento+','
    }
  })
  
  lista_hashtag_tratada = lista_hashtag_tratada
  .substr(0, (lista_hashtag_tratada.length - 1));
  return lista_hashtag_tratada;
}


export const  stream = () => {
  twitter_config.stream('statuses/filter', 
  parameters, (stream) => {

    stream.on('data', (tweet) =>{
      lista_tweets.push(tweet);
    });

    stream.on('error', (error) => {
      return (error)
    });

    setTimeout(stream.destroy, 10000)   
  })
}

