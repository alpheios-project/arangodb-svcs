const gql = require('graphql-sync');

const assertionType = new gql.GraphQLObjectType({
  name: 'Assertion',
  description: 'An assertion',
  fields() {
    return {
      id: {
        type: new gql.GraphQLNonNull(gql.GraphQLString),
        description: 'The id of the assertion'
      },
      subject: {
        type: new gql.GraphQLNonNull(gql.GraphQLString)  ,
        description: 'The subject of the assertion'
      },
      predicate: {
        type: new gql.GraphQLNonNull(gql.GraphQLString)  ,
        description: 'The assertion predicate'
      },
      object: {
        type: new gql.GraphQLNonNull(gql.GraphQLString)  ,
        description: 'The object of the assertion'
      },
      authority: {
        type: new gql.GraphQLNonNull(gql.GraphQLString)  ,
        description: 'The authority'
      }
    }
  }
});

const annotationType = new gql.GraphQLObjectType({
  name: 'Annotation',
  description: 'An annotation.',
  fields() {
    return {
      id: {
        type: new gql.GraphQLNonNull(gql.GraphQLString),
        description: 'The id of the annotation.'
      },
      lexemeId: {
        type: new gql.GraphQLNonNull(gql.GraphQLString),
        description: 'The id of the lexeme.'
      },
      assertions: {
       type: new gql.GraphQLNonNull(new gql.GraphQLList(assertionType)),
       description: 'Assertions'
      }
    }
  }
});

module.exports = {
  AnnotationType: annotationType,
  AssertionType: assertionType
};
