const gql = require('graphql-sync');

const assertionType = new gql.GraphQLObjectType({
  name: 'Assertion',
  description: 'An assertion',
  fields() {
    return {
      id: {
        type: new gql.GraphQLNonNull(gql.GraphQLString),
        description: 'The id of the assertion',
        resolve(id) {
          return 'http://any/assertion';
        }
      },
      subject: {
        type: new gql.GraphQLNonNull(gql.GraphQLString)  ,
        description: 'The subject of the assertion',
        resolve() {
          return 'subject';
        }
      },
      predicate: {
        type: new gql.GraphQLNonNull(gql.GraphQLString)  ,
        description: 'The assertion predicate',
        resolve() {
          return 'predicate';
        }
      },
      object: {
        type: new gql.GraphQLNonNull(gql.GraphQLString)  ,
        description: 'The object of the assertion',
        resolve() {
          return 'object';
        }
      },
      authority: {
        type: new gql.GraphQLNonNull(gql.GraphQLString)  ,
        description: 'The authority',
        resolve() {
          return 'authority';
        }
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
        description: 'The id of the annotation.',
        resolve(id) {
          return "http://any/annotation";
        }
      },
      lexemeId: {
        type: new gql.GraphQLNonNull(gql.GraphQLString),
        description: 'The id of the lexeme.',
        resolve(id) {
          return "http://any/lexeme";
        }
      },
      assertions: {
       type: new gql.GraphQLNonNull(new gql.GraphQLList(assertionType)),
       description: 'Assertions',
       resolve() {
         return [
           {
             id: 'http://any',
             subject: 'afore',
             predicate: 'hasPreferredLemmaVariant',
             object: 'absum'
            }
          ]
        }
      }
    }
  }
});

module.exports = {
  AnnotationType: annotationType,
  AssertionType: assertionType
};
