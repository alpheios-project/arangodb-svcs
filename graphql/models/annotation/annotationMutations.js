const gql = require('graphql-sync');
const annotationSchema = require('./annotationSchema');
const lexicalSchema = require('../lexical/lexicalSchema');
const query = require('../../../queries/query');
module.exports = {

  createLemmaVariant: {
    type: annotationSchema.AnnotationSetType,
    description: 'Create  a lemma variant annotation',
    args: {
      input: {
        type: new gql.GraphQLNonNull(lexicalSchema.LemmaVariantInputType)
      },
    },
    resolve(value, {input}) {
      // logic here should be
      // check to see if the variant exists already
      // if not:
      //    see if we need to create either lemma
      //      if so: create the lemma(s)
      //    create the lemma variant
      // then create the assertsTrue assertion for the isLemmaVariant relationship
      // should all be in a transaction

      const variantExists = query.findSpecificLemmaVariant(input.lemma,input.variantLemma);
      if (variantExists.length > 0) {
        return {
          id: 'http://id/annotation',
          lexemeId: 'http://id/lexeme',
          assertions: [
            {
              id: variantExists[0]._id,
              subject: variantExists[0]._from,
              predicate: 'isLemmaVariant',
              object: variantExists[0]._to
            }
          ]
        }
      } else {
        throw new gql.GraphQLError({
          message: `The variant does not currently exist`
        });
      }
    }
  }
};