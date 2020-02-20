import express from 'express'
import {lista_tweets, tratemento_hashtag, parameters, stream } from '../service/service'

const hashtagRouter = express.Router();


hashtagRouter.route('/buscar').post(  async (req, res)  =>{
  let lista_hashtag = req.body;
  let tratado_hashtag = tratemento_hashtag(lista_hashtag);
  console.log(tratado_hashtag)
  
  //console.log(req.body)
  //parameters.track="#RaspemOSovaco,#bbb,#BBB,#flamengo"

  parameters.track=tratado_hashtag;
  console.log('calculando')
  stream()
  setTimeout(()=>{
    res.send(lista_tweets) 
    
  }, 15000);
});

export default hashtagRouter;
