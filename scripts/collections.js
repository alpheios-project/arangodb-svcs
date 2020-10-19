'use strict';
const documentCollections = [
  'words',
  'lemmas',
  'inflections',
  'translations',
  'definitions',
  'features',
  'users',
  'comments',
  'contexts'
];

const edgeCollections = [
  'hasLemma',
  'isLemmaVariant',
  'isSpellingVariant',
  'hasDefinition',
  'hasFeature',
  'isTranslationOf',
  'canBeInflectionOf',
  'assertsTrue',
  'assertsFalse',
  'makesComment',
  'commentsOn',
  'attestedAt'
];

const fixturesNodes = {
  users: [
    { _key: 'net.alpheios',
      iri: 'https://alpheios.net'
    },
    { _key: 'balmas',
      iri: 'https://orcid.org/0000-0001-7556-1572'
    }
  ],
  words: [
    { _key: 'dicerelat',
      representation: 'dicere',
      lang: 'lat',
      createdBy: 'alpheios.net' ,
      createdOn: new Date().toString()
    },
    { _key: 'tinosgrc',
      representation: 'τίνος',
      lang: 'grc',
      createdBy: 'alpheios.net' ,
      createdOn: new Date().toString()
    },
    {
      _key: 'memenealt1',
      representation: 'μεμνῄμεθα',
      lang: 'grc',
      createdBy: 'alpheios.net' ,
      createdOn: new Date().toString()
    },
    {
      _key: 'memenealt2',
      representation: 'μεμνήμεθα',
      lang: 'grc',
      createdBy: 'alpheios.net' ,
      createdOn: new Date().toString()
    }
  ],
  lemmas: [
    { _key: 'whitlatdico1',
      representation: 'dico',
      lang: 'lat',
      pos: 'VERB',
      principalParts: ['dicere','dixi','dictus'],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'alpheios.net' ,
      createdOn: new Date().toString()
    },
    { _key: 'whitlatdico2',
      representation: 'dico',
      lang: 'lat',
      pos: 'VERB',
      principalParts: ['dicare','dicavi','dicatus'],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'alpheios.net' ,
      createdOn: new Date().toString()
    },
    { _key: 'whitlatafore',
      representation: 'afore',
      lang: 'lat',
      pos: 'VERB',
      principalParts: [],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'alpheios.net' ,
      createdOn: new Date().toString()
    },
    { _key: 'whitlatabsum',
      representation: 'absum',
      lang: 'lat',
      pos: 'VERB' ,
      principalParts: [],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'alpheios.net' ,
      createdOn: new Date().toString()
    },
    { _key: 'whitlatvult',
      representation: 'vult',
      lang: 'lat',
      pos: 'VERB',
      principalParts: [],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'alpheios.net',
      createdOn: new Date().toString()
    },
    { _key: 'whitlatvolo',
      representation: 'volo',
      lang: 'lat',
      pos: 'VERB',
      principalParts: [],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'alpheios.net',
      createdOn: new Date().toString()
    },
    { _key: 'whitlataccurro1',
      representation: 'accurro',
      lang: 'lat',
      pos: 'NOUN',
      principalParts: ['accurrere','accucurri','accursus'],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'CTX_users/net.alpheios',
      createdOn: new Date().toString()
    },
    { _key: 'whitlataccurro2',
      representation: 'volo',
      lang: 'lat',
      pos: 'NOUN',
      principalParts: ['accurrere','accurri','accursus'],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'CTX_users/net.alpheios',
      createdOn: new Date().toString()
    },
    { _key: 'whitlatsenatus',
      representation: 'senatus',
      lang: 'lat',
      pos: 'NOUN',
      principalParts: ['senatus'],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'CTX_users/net.alpheios',
      createdOn: new Date().toString()
    },
    { _key: 'morphgrctisx',
      representation: 'τίς',
      lang: 'grc',
      pos: 'X',
      langpos: 'irregular',
      principalParts: [],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'CTX_users/net.alpheios',
      createdOn: new Date().toString()
    },
    { _key: 'morphgrctis',
      representation: 'τίς',
      lang: 'grc',
      pos: 'PRON',
      principalParts: [],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'CTX_users/net.alpheios',
      createdOn: new Date().toString()
    }
  ],
  inflections: [
    {
      _key: 'dicerelatpresinfact',
      form: 'dicere',
      stem: 'dic',
      suffix: 'ere',
      udfeatures: {
        Tense: 'present',
        Voice: 'active',
        Mood: 'infinitive'
      }
    },
    {
      _key: 'tinostisgensing',
      form: "τίνος",
      stem: "τίνος",
      udfeatures: {
        Case: 'genitive',
        Number: 'singular',
      },
      xfeatures: {
        stemtype: 'inter',
        morphtype: 'enclitic indeclform'
      }
    },
    {
      _key: 'inflatsenatusvoc',
      form: 'senatu',
      stem: 'senat',
      suffix: 'u',
      udfeatures: {
        Case: 'vocative',
        Number: 'singular',
        Gender: 'masculine'
      },
      xfeatures: {
        Declension: '4th',
        Var: '1st'
      },
      createdBy: 'CTX_users/net.alpheios',
      createdOn: new Date().toString()
    }
  ],
  contexts: [
    {
      _key: 'dicereovidmet1',
      word: 'dicere',
      suffix: 'fert animus mutatus ',
      prefix: ' formas corpora; di',
      url: 'https://texts.alpheios.net/text/urn:cts:latinLit:phi0959.phi006.alpheios-text-lat1/passage/1.1-1.30',
      createdBy: 'CTX_users/balmas',
      createdOn: new Date().toString()
    }
  ]
};

const fixturesEdges = [
  { cname: 'hasLemma',
    data: [
      { _key: 'diceredico2',
        _from: 'CTX_words/dicerelat',
        _to: 'CTX_lemmas/diceredico2',
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      },
      {
        _key: 'tinostisx',
        _from: 'CTX_words/tinosgrc',
        _to: 'CTX_lemmas/morphgrctisx',
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      },
      {
        _key: 'tinostis',
        _from: 'CTX_words/tinosgrc',
        _to: 'CTX_lemmas/morphgrctis',
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      }
    ]
  },
  { cname: 'canBeInflectionOf',
    data: [
      {
        _key: "dicerelatpresinfactdico2",
        _from: "CTX_inflections/dicerelatpresinfact",
        _to: "CTX_lemmas/whitlatdico2",
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      },
      {
        _key: 'senatuvocsenatus',
        _from: 'CTX_inflections/inflatsenatusvoc',
        _to: 'CTX_lemmas/whitlatsenatus',
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      },
      {
        _key: 'tinosgensingtis',
        _from: 'CTX_inflections/tinostisgensing',
        _to: 'CTX_lemmas/morphgrctis',
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      }
    ]
  },
  { cname: 'isLemmaVariant',
    data: [
      { _key: 'aforevarabsum',
        _from: 'CTX_lemmas/whitlatafore',
        _to: 'CTX_lemmas/whitlatabsum',
        prefer: 'CTX_lemmas/whitlatabsum',
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      },
      { _key: 'accurro1varaccurro2',
        _from: 'CTX_lemmas/whitlataccurro1',
        _to: 'CTX_lemmas/whitlataccurro2',
        prefer: null,
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      },
      { _key: 'vultvarvolo',
        _from: 'CTX_lemmas/whitlatvult',
        _to: 'CTX_lemmas/whitlatvolo',
        prefer: 'CTX_lemmas/whitlatvolo',
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      }
    ]
  },
  { cname: 'isSpellingVariant',
    data: [
      { _key: 'memenealt1varmenalt2',
        _from: 'CTX_words/memenealt1',
        _to: 'CTX_words/memenealt2',
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      }
    ]
  },
  { cname: 'attestedAt',
    data: [
      {
        _key: 'disamdiceredicolemma',
        _from: 'CTX_hasLemma/diceredico2',
        _to: 'CTX_contexts/dicereovidmet1',
        createdBy: 'CTX_users/balmas',
        createdOn: new Date().toString()
      },
      {
        _key: 'disamdiceredicoinfl',
        _from: 'CTX_canBeInflectionOf/dicerelatpresinfactdico2',
        _to: 'CTX_contexts/dicereovidmet1',
        createdBy: 'CTX_users/balmas',
        createdOn: new Date().toString()
      }
    ]
  },
  {
    cname: 'assertsFalse',
    data: [
      { _from: 'CTX_users/net.alpheios',
        _to: 'CTX_hasLemma/tinostisx',
        degreeOfConfidence: '10',
        isPublic: true
      }
    ]
  },
  {
    cname: 'assertsTrue',
    data: [
      { _from: 'CTX_users/balmas',
        _to: 'CTX_attestedAt/disamdiceredicolemma',
        degreeOfConfidence: '10',
        isPublic: true
      },
      { _from: 'CTX_users/balmas',
        _to: 'CTX_attestedAt/disamdiceredicoinfl',
        degreeOfConfidence: '10',
        isPublic: true
      },
      { _from: 'CTX_users/balmas',
        _to: 'CTX_hasLemma/diceredico2',
        degreeOfConfidence: '10',
        isPublic: true
      },
      { _from: 'CTX_users/balmas',
        _to: 'CTX_canBeInflectionOf/dicerelatpresinfactdico2',
        degreeOfConfidence: '10',
        isPublic: true
      },
      { _from: 'CTX_users/net.alpheios',
        _to: 'CTX_hasLemma/diceredico2',
        degreeOfConfidence: '10',
        isPublic: true
      },
      { _from: 'CTX_users/net.alpheios',
        _to: 'CTX_canBeInflectionOf/dicerelatpresinfactdico2',
        degreeOfConfidence: '10',
        isPublic: true
      },
      { _from: 'CTX_users/net.alpheios',
        _to: 'CTX_hasLemma/tinostis',
        degreeOfConfidence: '10',
        isPublic: true
      },
      { _from: 'CTX_users/net.alpheios',
        _to: 'CTX_canBeInflectionOf/senatuvocsenatus',
        degreeOfConfidence: '10',
        isPublic: true
      },
      { _from: 'CTX_users/net.alpheios',
        _to: 'CTX_isLemmaVariant/aforevarabsum',
        degreeOfConfidence: '10',
        isPublic: true
      },
      { _from: 'CTX_users/net.alpheios',
        _to: 'CTX_isLemmaVariant/vultvarvolo',
        degreeOfConfidence: '10',
        isPublic: true
      },
      { _from: 'CTX_users/net.alpheios',
        _to: 'CTX_isLemmaVariant/accurro1varaccurro2',
        assertion: true,
        degreeOfConfidence: '10',
        isPublic: true
      },
      { _from: 'CTX_users/net.alpheios',
        _to: 'CTX_canBeInflectionOf/tinosgensingtis',
        assertion: true,
        degreeOfConfidence: '10',
        isPublic: true
      },
      { _from: 'CTX_users/net.alpheios',
        _to: 'CTX_isSpellingVariant/memenealt1varmenalt2',
        assertion: true,
        degreeOfConfidence: '10',
        isPublic: true
      }
    ]
  }
];



module.exports = {
  documentCollections: documentCollections,
  edgeCollections: edgeCollections,
  fixturesNodes: fixturesNodes,
  fixturesEdges: fixturesEdges
}
