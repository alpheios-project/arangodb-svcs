const gql = require('graphql-sync');
const lexicalSchema = require('../lexical/lexicalSchema');

const assertionType = new gql.GraphQLObjectType({
  name: 'Assertion',
  description: 'An assertion',
  fields() {
    return {
      subject: {
        type: lexicalSchema.LexicalObjectInterface,
        description: 'The subject of the assertion'
      },
      predicate: {
        type: gql.GraphQLString,
        description: 'The assertion predicate'
      },
      object: {
        type: lexicalSchema.LexicalObjectOutputType,
        description: 'The object of the assertion'
      },
      authorities: {
        type: new gql.GraphQLList(gql.GraphQLString),
        description: 'Authorities for this assertion'
      }
    }
  }
});

const annotationSetType = new gql.GraphQLObjectType({
  name: 'AnnotationSet',
  description: 'A set of annotations',
  fields() {
    return {
      target: {
        type: lexicalSchema.LexicalObjectInterface,
        description: 'The target of the assertions',
      },
      assertions: {
       type: new gql.GraphQLList(assertionType),
       description: 'Assertions'
      }
    }
  }
});

module.exports = {
  AnnotationSetType: annotationSetType,
  AssertionType: assertionType
};
