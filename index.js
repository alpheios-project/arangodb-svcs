'use strict';
const createGraphqlRouter = require('@arangodb/foxx/graphql');
const graphql = require('graphql-sync');
const schema = require('./graphql/rootSchema');

const router = createGraphqlRouter({
      schema: schema,
      graphiql: true,
      graphql: graphql,
}).summary('GraphQL endpoint')
.description('GraphQL endpoint for Alpheios word data.');
module.context.use("/graphql", router);


