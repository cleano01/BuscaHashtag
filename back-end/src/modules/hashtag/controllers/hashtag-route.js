import express from 'express'
import {lista_tweets, tratemento_hashtag, parameters, stream } from '../service/service'

const hashtagRouter = express.Router();


hashtagRouter.route('/buscar').post(  async (req, res)  =>{
  let lista_hashtag = req.body;
  let tratado_hashtag = tratemento_hashtag(lista_hashtag);
  parameters.track=tratado_hashtag;
  
  stream()
  
  setTimeout(()=>{
    res.send(lista_tweets) 
    
  }, 15000);
});

export default hashtagRouter;
