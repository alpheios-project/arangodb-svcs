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
  'hasDefinition',
  'hasFeature',
  'isTranslationOf',
  'canBeInflection',
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
    }
  ],
  lemmas: [
    { _key: 'whitlatafore',
      representation: 'afore',
      lang: 'lat',
      pos: 'verb',
      principalParts: [],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'alpheios.net' ,
      createdOn: new Date().toString()
    },
    { _key: 'whitlatabsum',
      representation: 'absum',
      lang: 'lat',
      pos: 'verb' ,
      principalParts: [],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'alpheios.net' ,
      createdOn: new Date().toString()
    },
    { _key: 'whitlatvult',
      representation: 'vult',
      lang: 'lat',
      pos: 'verb',
      principalParts: [],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'alpheios.net',
      createdOn: new Date().toString()
    },
    { _key: 'whitlatvolo',
      representation: 'volo',
      lang: 'lat',
      pos: 'verb',
      principalParts: [],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'alpheios.net',
      createdOn: new Date().toString()
    },
    { _key: 'whitlataccurro1',
      representation: 'accurro',
      lang: 'lat',
      pos: 'noun',
      principalParts: ['accurrere','accucurri','accursus'],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'CTX_users/net.alpheios',
      createdOn: new Date().toString()
    },
    { _key: 'whitlataccurro2',
      representation: 'volo',
      lang: 'lat',
      pos: 'noun',
      principalParts: ['accurrere','accurri','accursus'],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'CTX_users/net.alpheios',
      createdOn: new Date().toString()
    },
  ]
};

const fixturesEdges = [
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
  {
    cname: 'assertsTrue',
    data: [
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
