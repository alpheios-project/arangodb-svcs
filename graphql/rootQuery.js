const gql = require('graphql-sync');
const queries = require('./models/annotation/annotationQueries')


const rootFields = Object.assign({},
  queries
);

module.exports = new gql.GraphQLObjectType({
  name: 'RootQuery',
  fields: () => rootFields
});