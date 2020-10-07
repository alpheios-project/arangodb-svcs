const gql = require('graphql-sync');
const annotationSchema = require('./annotationSchema');
const lexicalSchema = require('../lexical/lexicalSchema');
module.exports = {

  createLemmaVariant: {
    type: annotationSchema.AnnotationType,
    description: 'Create  a lemma variant annotation',
    args: {
      lemmaVariant: {
        type: new gql.GraphQLNonNull(lexicalSchema.LemmaVariantInputType)
      },
    },
    resolve(value, {lemmaVariant}) {
      return {
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
    }
  }
};