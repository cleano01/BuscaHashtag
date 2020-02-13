import hashtagRouter from './modules/hashtag/hashtag-route'
import express from 'express';
import rota from './modules/hashtag/teste-rota'
let router = express.Router();


router.use('/api/hashtag', hashtagRouter);
router.use('/api/teste', rota)

export default router;





