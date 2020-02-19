import express from 'express'
import {lista_tweets, parameters, stream } from '../service/service'

const hashtagRouter = express.Router();

hashtagRouter.route('/parar').get((req, res) => {  
  console.log(parameters)
  res.send(lista_tweets);
});

hashtagRouter.route('/buscar').get( (req, res)  =>{
  parameters.track="#RaspemOSovaco,#bbb,#BBB"
  stream()    
  res.send({'Status':'Busca feita com sucesso'}) 
});

export default hashtagRouter;
