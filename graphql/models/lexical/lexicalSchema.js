'use strict';
const gql = require('graphql-sync');

let lemmaInputType, inflectionInputType, lexemeInputType, lemmaOutputType, lexemeOutputType;

const lexicalObjectInterface = new gql.GraphQLInterfaceType({
  name: "LexicalObjectInterface",
  description: "a generic lexical object",
  fields() {
    return {
      IRI: {
        type: gql.GraphQLString,
        description: "an IRI for this Object"
      }
    }
  },
  resolveType(obj) {
    if (obj._id) {
      if (obj._id.match(/lemmas\//)) {
        return lemmaOutputType;
      }
    } else if (obj.lemma) {
      return lexemeOutputType;
    } else {
      return lemmaOutputType;
    }
  }
});

const preferVariantEnum = new gql.GraphQLEnumType({
  name: 'preferVariant',
  description: 'Which to prefer of a variant - the target or variant or neither',
  values: {
    TARGET: {
      value: 'target',
      description: 'The target of the isLemmaVariant relationship'
    },
    VARIANT: {
      value: 'variant',
      description: 'The variant in the isLemmaVariant relationship'
    },
    NEITHER: {
      value: 'neither',
      description: 'Neither is preferred'
    }
  }
});
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
      prefer: {
        type: new gql.GraphQLNonNull(preferVariantEnum),
        description: 'Which to prefer -- target or variant or neither'
      },
      source: {
        type: new gql.GraphQLNonNull(gql.GraphQLString)
      }
    }
  }
});

const lexicalObjectOutputType = new gql.GraphQLObjectType({
  name: 'LexicalObject',
  description: 'A generic lexical object',
  fields() {
    return {
      IRI: {
        type: gql.GraphQLString,
        description: 'The IRI of the object'
      }
    }
  },
  interfaces: [lexicalObjectInterface]
});

lemmaInputType = new gql.GraphQLInputObjectType({
  name: 'LemmaInput',
  description: 'A lemma passed in input.',
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
      principalParts: {
        type: new gql.GraphQLList(gql.GraphQLString),
        description: 'Principal parts of the lemma'
      },
      source: {
        type: gql.GraphQLString,
        description: 'The source which identified the lemma'
      }
    };
  }
});

lemmaOutputType = new gql.GraphQLObjectType({
  name: 'Lemma',
  description: 'A lemma.',
  fields() {
    return {
      IRI: {
        type: gql.GraphQLString,
        description: 'The IRI of the lemma.'
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
      principalParts: {
        type: new gql.GraphQLList(gql.GraphQLString),
        description: 'Principal parts of the lemma'
      },
      source: {
        type: gql.GraphQLString,
        description: 'The source which identified the lemma'
      }
    };
  },
  interfaces: [lexicalObjectInterface]
});

inflectionInputType = new gql.GraphQLInputObjectType({
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
lexemeInputType = new gql.GraphQLInputObjectType({
  name: "LexemeInputType",
  description: 'A lexeme',
  fields: () => ({
    IRI: {
      type: gql.GraphQLString,
      description: 'The IRI of the lexeme.'
    },
    lemma: {
      type: lemmaInputType,
      description: 'The lemma'
    },
    inflections: {
      description: 'Inflections',
      type: new gql.GraphQLList(inflectionInputType)
    }
  })
});

lexemeOutputType = new gql.GraphQLObjectType({
  name: "Lexeme",
  description: 'A lexeme',
  fields: () => ({
    IRI: {
      type: gql.GraphQLString,
      description: 'The IRI of the lexeme.'
    },
    lemma: {
      type: lemmaOutputType,
      description: 'The lemma'
    }
  }),
  interfaces: [ lexicalObjectInterface ]
});


module.exports = {
  LexemeInputType: lexemeInputType,
  LemmaInputType: lemmaInputType,
  InflectionInputType: inflectionInputType,
  LemmaVariantInputType: lemmaVariantInputType,
  LexicalObjectInterface: lexicalObjectInterface,
  LexicalObjectOutputType: lexicalObjectOutputType,
  LemmaOutputType: lemmaOutputType,
  LexemeOutputType: lexemeOutputType
};
