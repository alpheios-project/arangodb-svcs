const gql = require('graphql-sync');
const annotationSchema = require('./annotationSchema');
const lexicalSchema = require('../lexical/lexicalSchema');

const query = require('../../../queries/query');

module.exports = {
  wordAnnotations: {
    type: new gql.GraphQLList(annotationSchema.AnnotationSetType),
    args: {
      word: {
        description: 'A word',
        type: new gql.GraphQLNonNull(gql.GraphQLString)
      },
      lexemes: {
        description: 'Any lexemes as possible annotation targets for this word.',
        type: new gql.GraphQLList(lexicalSchema.LexemeInputType)
      }
    },
    resolve(root,{word, lexemes}) {
      let annotations = [];
      for (lexeme of lexemes) {
        annotations.push(
        {
              target: lexeme,
              assertions: query.findAllLemmaVariants(lexeme.lemma)
         }
       )
     }
     return annotations;
    }
  },
  lemma: {
    type: lexicalSchema.LemmaOutputType,
    description: "exposing lemma output"
  },
  lexeme: {
    type: lexicalSchema.LexemeOutputType,
    description: "exposing lexeme output"
  }
};
