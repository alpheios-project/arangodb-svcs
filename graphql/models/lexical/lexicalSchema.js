'use strict';
const gql = require('graphql-sync');

const lemmaVariantInputType = new gql.GraphQLInputObjectType({
  name: 'LemmaVariant',
  descript: 'A variant lemma',
  fields() {
    return {
      lemma: {
        type: new gql.GraphQLNonNull(lemmaInputType)
      },
      variantLemma: {
        type: new gql.GraphQLNonNull(lemmaInputType)
      },
      preferred: {
        type: new gql.GraphQLNonNull(gql.GraphQLBoolean)
      },
      authority: {
        type: new gql.GraphQLNonNull(gql.GraphQLString)
      }
    }
  }
});

const lemmaInputType = new gql.GraphQLInputObjectType({
  name: 'Lemma',
  description: 'A lemma.',
  fields() {
    return {
      id: {
        type: gql.GraphQLString,
        description: 'The id of the lemma.'
      },
      representation: {
        type: gql.GraphQLString,
        description: 'Canonical written representation of the lemma.'
      },
      pos: {
        type: gql.GraphQLString,
        description: 'The part of speech of the lemma'
      },
      lang: {
        type: gql.GraphQLString,
        description: 'The language of the lemma'
      },
      authority: {
        type: gql.GraphQLString,
        description: 'The authority which identified the lemma'
      }
    };
  }
});

const inflectionInputType = new gql.GraphQLInputObjectType({
  name: 'Inflection',
  description: 'An inflection',
  fields() {
    return {
      id: {
        type: gql.GraphQLString,
        description: 'The id of the inflection'
      },
      udstring: {
        type: new gql.GraphQLNonNull(gql.GraphQLString),
        description: 'Universal Dependencies Morph String'
      }
    }
  }
});
const lexemeInputType = new gql.GraphQLInputObjectType({
  name: "lexeme",
  description: 'A lexeme',
  fields: () => ({
    id: {
      type: gql.GraphQLString,
      description: 'The id of the lexeme.'
    },
    lemma: {
      type: lemmaInputType,
      description: 'The lemma'
    },
    inflections: {
      description: 'Inflections',
      type: new gql.GraphQLList(inflectionInputType)
    },
    provider: {
      description: 'Provider',
      type: new gql.GraphQLNonNull(gql.GraphQLString)
    }
  })
});

module.exports = {
  LexemeInputType: lexemeInputType,
  LemmaInputType: lemmaInputType,
  InflectionInputType: inflectionInputType,
  LemmaVariantInputType: lemmaVariantInputType
};
