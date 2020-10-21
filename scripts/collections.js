'use strict';
const documentCollections = [
  'lexicalEntities_lat',
  'lexicalEntities_grc',
  'users',
  'comments',
  'contexts'
];

const edgeCollections = [
  'lexicalRelations',
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
  lexicalEntities_lat: [
    { _key: 'dicere',
      type: 'alpheios:word',
      representation: 'dicere',
      lang: 'lat',
      createdBy: 'alpheios.net' ,
      createdOn: new Date().toString()
    },
    { _key: 'whitdico1',
      type: 'alpheios:lemma',
      representation: 'dico',
      lang: 'lat',
      pos: 'VERB',
      principalParts: ['dicere','dixi','dictus'],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'alpheios.net' ,
      createdOn: new Date().toString()
    },
    { _key: 'whitdico2',
      type: 'alpheios:lemma',
      representation: 'dico',
      lang: 'lat',
      pos: 'VERB',
      principalParts: ['dicare','dicavi','dicatus'],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'alpheios.net' ,
      createdOn: new Date().toString()
    },
    { _key: 'whitafore',
      type: 'alpheios:lemma',
      representation: 'afore',
      lang: 'lat',
      pos: 'VERB',
      principalParts: [],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'alpheios.net' ,
      createdOn: new Date().toString()
    },
    { _key: 'whitabsum',
      type: 'alpheios:lemma',
      representation: 'absum',
      lang: 'lat',
      pos: 'VERB' ,
      principalParts: [],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'alpheios.net' ,
      createdOn: new Date().toString()
    },
    { _key: 'whitvult',
      type: 'alpheios:lemma',
      representation: 'vult',
      lang: 'lat',
      pos: 'VERB',
      principalParts: [],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'alpheios.net',
      createdOn: new Date().toString()
    },
    { _key: 'whitvolo',
      type: 'alpheios:lemma',
      representation: 'volo',
      lang: 'lat',
      pos: 'VERB',
      principalParts: [],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'alpheios.net',
      createdOn: new Date().toString()
    },
    { _key: 'whitaccurro1',
      type: 'alpheios:lemma',
      representation: 'accurro',
      lang: 'lat',
      pos: 'NOUN',
      principalParts: ['accurrere','accucurri','accursus'],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'CTX_users/net.alpheios',
      createdOn: new Date().toString()
    },
    { _key: 'whitaccurro2',
      type: 'alpheios:lemma',
      representation: 'volo',
      lang: 'lat',
      pos: 'NOUN',
      principalParts: ['accurrere','accurri','accursus'],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'CTX_users/net.alpheios',
      createdOn: new Date().toString()
    },
    { _key: 'whitsenatus',
      type: 'alpheios:lemma',
      representation: 'senatus',
      lang: 'lat',
      pos: 'NOUN',
      principalParts: ['senatus'],
      source: 'net.alpheios:tools:wordsxml.v1',
      createdBy: 'CTX_users/net.alpheios',
      createdOn: new Date().toString()
    },
    {
      _key: 'dicerepresinfact',
      type: 'alpheios:infl',
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
      _key: 'inflsenatusvoc',
      type: 'alpheios:infl',
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
  lexicalEntities_grc: [
    { _key: 'tinos',
      type: 'alpheios:word',
      representation: 'τίνος',
      lang: 'grc',
      createdBy: 'alpheios.net' ,
      createdOn: new Date().toString()
    },
    {
      _key: 'memenealt1',
      type: 'alpheios:word',
      representation: 'μεμνῄμεθα',
      lang: 'grc',
      createdBy: 'alpheios.net' ,
      createdOn: new Date().toString()
    },
    {
      _key: 'memenealt2',
      type: 'alpheios:word',
      representation: 'μεμνήμεθα',
      lang: 'grc',
      createdBy: 'alpheios.net' ,
      createdOn: new Date().toString()
    },
    { _key: 'morphtisx',
      type: 'alpheios:lemma',
      representation: 'τίς',
      lang: 'grc',
      pos: 'X',
      langpos: 'irregular',
      principalParts: [],
      source: 'org.perseus:tools:morpheus.v1',
      createdBy: 'CTX_users/net.alpheios',
      createdOn: new Date().toString()
    },
    { _key: 'morphtis',
      type: 'alpheios:lemma',
      representation: 'τίς',
      lang: 'grc',
      pos: 'PRON',
      principalParts: [],
      source: 'org.perseus:tools:morpheus.v1',
      createdBy: 'CTX_users/net.alpheios',
      createdOn: new Date().toString()
    },
    {
      _key: 'tinostisgensing',
      type: 'alpheios:infl',
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
      _key: 'dhlow',
      type: 'alpheios:lemma',
      representation: 'δηλόω',
      lang: 'grc',
      pos: 'VERB',
      principalParts: [],
      source: 'org.perseus:tools:morpheus.v1',
      createdBy: 'CTX_users/net.alpheios',
      createdOn: new Date().toString()
    },
    {
      _key: 'dhloiinfl3rdopt',
      type: 'alpheios:infl',
      form: 'δηλοῖ',
      stem: 'δηλ',
      suffix: 'οῖ',
      udfeatures: {
        Mood: 'optative',
        Number: 'singular',
        Person: '3rd',
        Tense: 'present',
        Voice: 'active',
      },
      xfeatures: {
        stemtype: 'ow_pr',
        derivtype: 'ow_denom',
        morph: 'contr'
      },
      source: 'org.perseus:tools:morpheus.v1',
      createdBy: 'CTX_users/net.alpheios',
      createdOn: new Date().toString()
    },
    {
      _key: 'dhloiinfl3rdind',
      type: 'alpheios:infl',
      form: 'δηλοῖ',
      stem: 'δηλ',
      suffix: 'οῖ',
      udfeatures: {
        Mood: 'indicative',
        Number: 'singular',
        Person: '3rd',
        Tense: 'present',
        Voice: 'active',
      },
      xfeatures: {
        stemtype: 'ow_pr',
        derivtype: 'ow_denom',
        morph: 'contr'
      },
      source: 'org.perseus:tools:morpheus.v1',
      createdBy: 'CTX_users/net.alpheios',
      createdOn: new Date().toString()
    },
    {
      _key: 'dhloiinfl2ndsub',
      type: 'alpheios:infl',
      form: 'δηλοῖ',
      stem: 'δηλ',
      suffix: 'οῖ',
      udfeatures: {
        Mood: 'subjunctive',
        Number: 'singular',
        Person: '2nd',
        Tense: 'active',
        Voice: 'mediopassive',
      },
      xfeatures: {
        stemtype: 'ow_pr',
        derivtype: 'ow_denom',
        morph: 'contr'
      },
      source: 'Smyth',
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
  { cname: 'lexicalRelations',
    data: [
      { _key: 'dhloinfl3rdindnegate',
        _to: 'CTX_lexicalEntities_grc/dhlow',
        _from: 'CTX_lexicalEntities_grc/dhloiinfl3rdind',
        type: 'canNotBeInflectionOf',
        isPublic: true,
        confidence: 1,
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      },
      { _key: 'dhloinfl3rdoptnegate',
        _to: 'CTX_lexicalEntities_grc/dhlow',
        _from: 'CTX_lexicalEntities_grc/dhloiinfl3rdopt',
        type: 'canNotBeInflectionOf',
        isPublic: true,
        confidence: 1,
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      },
      { _key: 'dhloiinfl2ndsubdhlow',
        _to: 'CTX_lexicalEntities_grc/dhlow',
        _from: 'CTX_lexicalEntities_grc/dhloiinfl2ndsub',
        type: 'canBeInflectionOf',
        isPublic: true,
        confidence: 1,
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      },
      { _key: 'diceredico2',
        _to: 'CTX_lexicalEntities_lat/dicere',
        _from: 'CTX_lexicalEntities_lat/diceredico2',
        type: 'isLemmaOf',
        isPublic: true,
        confidence: 1,
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      },
      {
        _key: 'tinostisx',
        _to: 'CTX_lexicalEntities_grc/tinos',
        _from: 'CTX_lexicalEntities_grc/morphtisx',
        type: 'isNotLemmaOf',
        isPublic: true,
        confidence: 1,
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      },
      {
        _key: 'tinostis',
        _to: 'CTX_lexicalEntities_grc/tinos',
        _from: 'CTX_lexicalEntities_grc/morphtis',
        type: 'isLemmaOf',
        isPublic: true,
        confidence: 1,
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      },
      {
        _key: "dicerepresinfactdico2",
        _from: "CTX_lexicalEntities_lat/dicerepresinfact",
        _to: "CTX_lexicalEntities_lat/whitdico2",
        type: 'canBeInflectionOf',
        isPublic: true,
        confidence: 1,
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      },
      {
        _key: 'senatuvocsenatus',
        _from: 'CTX_lexicalEntities_lat/inflsenatusvoc',
        _to: 'CTX_lexicalEntities_lat/whitsenatus',
        type: 'canBeInflectionOf',
        isPublic: true,
        confidence: 1,
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      },
      {
        _key: 'tinosgensingtis',
        _from: 'CTX_lexicalEntities_grc/tinostisgensing',
        _to: 'CTX_lexicalEntities_grc/morphtis',
        type: 'canBeInflectionOf',
        isPublic: true,
        confidence: 1,
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      },
      { _key: 'aforevarabsum',
        _from: 'CTX_lexicalEntities_lat/whitafore',
        _to: 'CTX_lexicalEntities_lat/whitabsum',
        type: 'isLemmaVariant',
        isPublic: true,
        confidence: 1,
        prefer: 'CTX_lexicalEntities_lat/whitabsum',
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      },
      { _key: 'accurro1varaccurro2',
        _from: 'CTX_lexicalEntities_lat/whitaccurro1',
        _to: 'CTX_lexicalEntities_lat/whitaccurro2',
        type: 'isLemmaVariant',
        isPublic: true,
        confidence: 1,
        prefer: null,
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      },
      { _key: 'vultvarvolo',
        _from: 'CTX_lexicalEntities_lat/whitvult',
        _to: 'CTX_lexicalEntities_lat/whitvolo',
        type: 'isLemmaVariant',
        isPublic: true,
        confidence: 1,
        prefer: 'CTX_lexicalEntities_lat/whitvolo',
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      },
      { _key: 'memenealt1varmenalt2',
        _from: 'CTX_lexicalEntities_grc/memenealt1',
        _to: 'CTX_lexicalEntities_grc/memenealt2',
        type: 'isSpellingVariant',
        isPublic: true,
        confidence: 1,
        createdBy: 'CTX_users/net.alpheios',
        createdOn: new Date().toString()
      }
    ]
  },
  { cname: 'attestedAt',
    data: [
      {
        _key: 'disamdicere',
        type: 'attestedAt',
        _from: 'CTX_lexicalEntities_lat/dicere',
        _to: 'CTX_contexts/dicereovidmet1',
        isPublic: true,
        confidence: 1,
        createdBy: 'CTX_users/balmas',
        createdOn: new Date().toString()
      },
      {
        _key: 'disamdiceredicolemma',
        _from: 'CTX_lexicalEntities_lat/whitdico2',
        _to: 'CTX_contexts/dicereovidmet1',
        type: 'attestedAt',
        isPublic: true,
        confidence: 1,
        createdBy: 'CTX_users/balmas',
        createdOn: new Date().toString()
      },
      {
        _key: 'disamdiceredicoinfl',
        _from: 'CTX_lexicalEntities_lat/dicerepresinfact',
        _to: 'CTX_contexts/dicereovidmet1',
        type: 'attestedAt',
        isPublic: true,
        confidence: 1,
        createdBy: 'CTX_users/balmas',
        createdOn: new Date().toString()
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
