const gql = require('graphql-sync');
const annotationSchema = require('./annotationSchema');
const lexicalSchema = require('../lexical/lexicalSchema');

module.exports = {
  lexemeAnnotations: {
    type: new gql.GraphQLList(annotationSchema.AnnotationType),
    args: {
      word: {
        description: 'The word',
        type: new gql.GraphQLNonNull(gql.GraphQLString)
      },
      lexemes: {
        description: 'Any available lexemes',
        type: new gql.GraphQLList(lexicalSchema.LexemeInputType)
      }
    },
    resolve(root, args) {
      return [
        {
          id: 'http://id/annotation',
          lexemeId: 'http://id/lexeme',
          assertions: [
            {
              id: 'http://any',
              subject: 'afore',
              predicate: 'hasPreferredLemmaVariant',
              object: 'absum'
            }
          ]
        }
      ]
    }
  }
};
