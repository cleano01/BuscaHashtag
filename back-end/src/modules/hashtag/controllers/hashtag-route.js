import express from 'express'
import {lista_tweets, parameters, stream } from '../service/service'

const hashtagRouter = express.Router();

hashtagRouter.route('/parar').get((req, res) => {  
  res.send(lista_tweets);
});

hashtagRouter.route('/buscar').get(  async (req, res)  =>{
  parameters.track="#RaspemOSovaco,#bbb,#BBB"
  console.log('calculando')
  stream()
  setTimeout(()=>{

    res.send(lista_tweets) 
  }, 15000);
   console.log('ok')
});

export default hashtagRouter;
