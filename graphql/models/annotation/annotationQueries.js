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
        type: lexicalSchema.WordInputType
      },
      lexemes: {
        description: 'Any lexemes as possible annotation targets for this word.',
        type: new gql.GraphQLList(lexicalSchema.LexemeInputType)
      }
    },
    resolve(root,{word, lexemes}) {
      let annotations = [];
      let wordAssertions = query.findLemmasForWord(word);
      let wordLexemes = [];
      if (wordAssertions) {
        annotations.push({
          target: wordAssertions[0].subject,
          assertions: wordAssertions
        });
        wordLexemes = wordAssertions.map((a) => { return { lemma: a.object } });
      }
      console.log("WL",wordLexemes);
      for (lexeme of [...lexemes,...wordLexemes]) {
        let assertions = query.findAllLemmaVariants(lexeme.lemma);
        let inflections = query.findAllInflections(lexeme.lemma);
        let lemmaNegations = query.findLemmaNegations(word,lexeme.lemma);
        assertions.push(...inflections,...lemmaNegations);
        annotations.push(
        {
              target: lexeme,
              assertions: assertions
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
  },
  inflection: {
    type: lexicalSchema.InflectionOutputType,
    description: "exposing inflection output"
  },
  word: {
    type: lexicalSchema.WordOutputType,
    description: "exposing word output"
  }
};
