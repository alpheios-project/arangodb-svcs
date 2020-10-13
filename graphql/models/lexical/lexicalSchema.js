'use strict';
const gql = require('graphql-sync');

let lemmaInputType, inflectionInputType, lexemeInputType, lemmaOutputType, lexemeOutputType, inflectionOutputType, wordInputType, wordOutputType;

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
    console.log("RESOLVE",obj);
    if (obj._id) {
      if (obj._id.match(/lemmas\//)) {
        return lemmaOutputType;
      } else if (obj._id.match(/inflections\//)) {
        return inflectionOutputType
      } else if (obj._id.match(/words\//)) {
        return wordOutputType
      }
    } else if (obj.lemma) {
      return lexemeOutputType;
    } else {
      return lemmaOutputType;
    }
  }
});

const UDPOSEnum = new gql.GraphQLEnumType({
  name: 'UDPOSEnum',
  description: "Enumeration of Universal Dependencies Part of Speech Tags",
  values: {
    ADJ: {
      value: "ADJ",
      description: "adjective"
    },
    ADP: {
      value: "ADP",
      description: "adposition"
    },
    ADV: {
      value: "ADV",
      description: "adverb"
    },
    AUX: {
      value: "AUX",
      description: "auxiliary"
    },
    CCONJ: {
      value: "CCONJ",
      description: "coordinating conjunction"
    },
    DET: {
      value: "DET",
      description: "determiner"
    },
    INTJ: {
      value:"INTJ",
      description: "interjection"
    },
    NOUN: {
      value: "NOUN",
      description: "noun"
    },
    NUM: {
      value: "NUM",
      description: "numeral"
    },
    PART: {
      value: "PART",
      description: "particle"
    },
    PRON: {
      value: "PRON",
      description: "pronoun"
    },
    PROPN: {
      value: "PROPN",
      description: "proper noun"
    },
    PUNCT: {
      value: "PUNCT",
      description: "punctuation"
    },
    SCONJ: {
      value: "SCONJ",
      description: "subordinating conjunction"
    },
    SYM: {
      value: "SYM",
      description: "symbol"
    },
    VERB: {
      value: "VERB",
      description: "verb"
    },
    X: {
      value: "X",
      description: "other"
    }
  }
})

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

wordInputType = new gql.GraphQLInputObjectType({
  name: 'WordInput',
  description: 'A word passed in input.',
  fields() {
    return {
      representation: {
        type: gql.GraphQLString,
        description: 'Written representation of the word.'
      },
      lang: {
        type: gql.GraphQLString,
        description: 'The language of the word'
      }
    }
  }
});

wordOutputType = new gql.GraphQLObjectType({
  name: 'Word',
  description: 'A word.',
  fields() {
    return {
      IRI: {
        type: gql.GraphQLString,
        description: "IRI of the word",
        resolve(word) {
          return word._id;
        }
      },
      representation: {
        type: gql.GraphQLString,
        description: 'Written representation of the word.'
      },
      lang: {
        type: gql.GraphQLString,
        description: 'The language of the word'
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
        type: UDPOSEnum,
        description: 'The part of speech of the lemma'
      },
      langpos: {
        type: gql.GraphQLString,
        description: 'language specific pos (when UDPOS == "X")'
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
        description: 'The IRI of the lemma.',
        resolve(lemma) {
          return lemma._id
        }
      },
      representation: {
        type: gql.GraphQLString,
        description: 'Canonical written representation of the lemma.'
      },
      pos: {
        type: UDPOSEnum,
        description: 'The part of speech of the lemma'
      },
      langpos: {
        type: gql.GraphQLString,
        description: 'language specific pos (when UDPOS == "X")'
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


const ExtraFeatureType = new gql.GraphQLObjectType({
  name: "ExtraFeatureType",
  description: "Extra Features",
  fields() {
    return {
      Declension: {
        type: gql.GraphQLString, // TODO use Enum
        description: "declension"
      },
      Var: {
        type: gql.GraphQLString, // TODO use Enum
        description: "var"
      },
      Stemtype: {
        type: gql.GraphQLString, // TODO use Enum
        description: "stemtype"
      },
      Morphtype: {
        type: gql.GraphQLString, // TODO use Enum
        description: "morphtype"
      }
    }
  }
});

const ExtraFeatureInputType = new gql.GraphQLInputObjectType({
  name: "ExtraFeatureInputType",
  description: "Extra Features",
  fields() {
    return {
      Declension: {
        type: gql.GraphQLString, // TODO use Enum
        description: "declension"
      },
      Var: {
        type: gql.GraphQLString, // TODO use Enum
        description: "var"
      },
      Stemtype: {
        type: gql.GraphQLString, // TODO use Enum
        description: "stemtype"
      },
      Morphtype: {
        type: gql.GraphQLString, // TODO use Enum
        description: "morphtype"
      }
    }
  }
});

const UDFeatureInputType = new gql.GraphQLInputObjectType({
  name: "UDFeatureInputType",
  description: "Universal Dependency Features",
  fields() {
    return {
      Animacy: {
        type: gql.GraphQLString, // TODO use Enum
        description: "animacy"
      },
      Gender: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'gender'
      },
      NounClass: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'noun class'
      },
      Number: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'number'
      },
      Case: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'case'
      },
      Definite: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'definite'
      },
      Degree: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'degree'
      },
      VerbForm: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'verb form'
      },
      Mood: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'mood'
      },
      Tense: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'tense'
      },
      Aspect: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'aspect'
      },
      Voice: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'voice'
      },
      Evident: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'evident'
      },
      Polarity: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'polarity'
      },
      Person: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'person'
      },
      Polite: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'polite'
      },
      Clusivity: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'clusivity'
      }
    }
  }
});

const UDFeatureType = new gql.GraphQLObjectType({
  name: "UDFeatureType",
  description: "Universal Dependency Features",
  fields() {
    return {
      Animacy: {
        type: gql.GraphQLString, // TODO use Enum
        description: "animacy"
      },
      Gender: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'gender'
      },
      NounClass: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'noun class'
      },
      Number: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'number'
      },
      Case: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'case'
      },
      Definite: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'definite'
      },
      Degree: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'degree'
      },
      VerbForm: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'verb form'
      },
      Mood: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'mood'
      },
      Tense: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'tense'
      },
      Aspect: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'aspect'
      },
      Voice: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'voice'
      },
      Evident: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'evident'
      },
      Polarity: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'polarity'
      },
      Person: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'person'
      },
      Polite: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'polite'
      },
      Clusivity: {
        type: gql.GraphQLString, // TODO use Enum
        description: 'clusivity'
      }
    }
  }
});

inflectionOutputType = new gql.GraphQLObjectType({
  name: 'Inflection',
  description: 'An inflection',
  fields() {
    return {
      IRI: {
        type: gql.GraphQLString,
        description: 'The IRI of the inflection',
        resolve(inflection) {
          return inflection._id
        }
      },
      form: {
        type: gql.GraphQLString,
        description: "form"
      },
      stem: {
        type: gql.GraphQLString,
        description: "stem"
      },
      suffix: {
        type: gql.GraphQLString,
        description: "suffix"
      },
      prefix: {
        type: gql.GraphQLString,
        description: "prefix"
      },
      lang: {
        type: gql.GraphQLString,
        description: 'The language of the lemma'
      },
      udfeatures: {
        type: UDFeatureType,
        description: "Universal Dependency Features"
      },
      xfeatures: {
        type: ExtraFeatureType,
        description: "Extra Features"
      }
    }
  },
  interfaces: [lexicalObjectInterface]
});

inflectionInputType = new gql.GraphQLInputObjectType({
  name: 'InflectionInput',
  description: 'An inflection',
  fields() {
    return {
      IRI: {
        type: gql.GraphQLString,
        description: 'The IRI of the inflection'
      },
      form: {
        type: gql.GraphQLString,
        description: "form"
      },
      stem: {
        type: gql.GraphQLString,
        description: "stem"
      },
      suffix: {
        type: gql.GraphQLString,
        description: "suffix"
      },
      prefix: {
        type: gql.GraphQLString,
        description: "prefix"
      },
      lang: {
        type: gql.GraphQLString,
        description: 'The language of the lemma'
      },
      udfeatures: {
        type: UDFeatureInputType,
        description: "Universal Dependency Features"
      },
      xfeatures: {
        type: ExtraFeatureInputType,
        description: "Extra features not included in UD"
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
      type: new gql.GraphQLList(inflectionInputType),
      description: 'Inflections'
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
  LexemeOutputType: lexemeOutputType,
  InflectionOutputType: inflectionOutputType,
  WordInputType: wordInputType,
  WordOutputType: wordOutputType
};
