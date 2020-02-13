import express from 'express'
import {lista_tweets, parameters, stream } from '../service/service'

const hashtagRouter = express.Router();

hashtagRouter.route('/parar').get((req, res) => {  
  console.log(parameters)
  res.send(lista_tweets);
});

hashtagRouter.route('/buscar').get( (req, res)  =>{
  parameters.track="#flamengo,#festabbb,#BBBB20"
  stream()    
  res.send('ok23') 
});

export default hashtagRouter;
