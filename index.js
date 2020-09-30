'use strict'

const joi = require('joi');


const createRouter = require('@arangodb/foxx/router');
const router = createRouter();

module.context.use(router);

router.get('/annotations/:name', function (req, res) {
  res.send(`Hello ${req.pathParams.name}`);
})
.response(['text/plain'], 'A personalized greeting.')
.summary('Personalized greeting')
.description('Prints a personal greeting');

router.post('/sum', function (req, res) {
  const values = req.body.values;
  res.send({
    result: values.reduce(function (a,b) {
      return a+b;
    }, 0)
  });
})
.body(joi.object({
  values: joi.array().items(joi.number().required()).required()
}).required(), 'Values to add together.')
.response(joi.object({
  result: joi.number().required()
}).required(), 'Sum of the input values.')
.summary('Add up numbers')
.description('Calculates the sum of an array');

