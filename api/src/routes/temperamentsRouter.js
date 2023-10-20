const { Router } = require('express');
const {
   getAllTemperamentsHandler,
   getDogByTemperamentHandler
} = require('../handlers/getHandler');

const temperamentsRouter = Router();

temperamentsRouter.get('/', getAllTemperamentsHandler);
temperamentsRouter.get('/:temperament', getDogByTemperamentHandler);






module.exports = temperamentsRouter;