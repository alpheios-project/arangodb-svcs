const gql = require('graphql-sync');
const mutations = require('./models/annotation/annotationMutations');


const rootFields = Object.assign({},
  mutations
);

module.exports = new gql.GraphQLObjectType({
  name: 'RootMutation',
  fields: () => rootFields
})