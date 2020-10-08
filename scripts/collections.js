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
  lemmas: [
    { _key: 'whitlatafore', lang: 'lat', representation: 'afore', authority: 'net.alpheios:tools:wordsxml.v1', pos: 'verb' },
    { _key: 'whitlatabsum', lang: 'lat', representation: 'absum', authority: 'net.alpheios:tools:wordsxml.v1', pos: 'verb' }
  ]
};

const fixturesEdges = {
  isLemmaVariant: [
    { _from: 'CTX_lemmas/whitlatafore', _to: 'CTX_lemmas/whitlatabsum', authority: 'net.alpheios' }
  ]
};



module.exports = {
  documentCollections: documentCollections,
  edgeCollections: edgeCollections,
  fixturesNodes: fixturesNodes,
  fixturesEdges: fixturesEdges
}
