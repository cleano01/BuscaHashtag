import express from 'express'
import {lista_tweets, parameters, stream } from '../service/service'

const hashtagRouter = express.Router();


hashtagRouter.route('/buscar').post(  async (req, res)  =>{
  console.log(req.body)
  parameters.track="#RaspemOSovaco,#bbb,#BBB,#flamengo"
  console.log('calculando')
  stream()
  setTimeout(()=>{
    res.send(lista_tweets) 
  }, 15000);
});

export default hashtagRouter;
