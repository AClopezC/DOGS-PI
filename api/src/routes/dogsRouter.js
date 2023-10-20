const { Router } = require('express');
const {
      getAllDogsHandler,
      getDogByIdHandler,
      getDogByNameHandler,
} = require('../handlers/getHandler');
const {
   createDogHandler
} = require('../handlers/postHandler');

const dogsRouter = Router();

dogsRouter.get('/dogs', getAllDogsHandler);
dogsRouter.get('/dogs/:id', getDogByIdHandler);
dogsRouter.get('/name', getDogByNameHandler);


dogsRouter.post('/create', createDogHandler);





module.exports = dogsRouter;