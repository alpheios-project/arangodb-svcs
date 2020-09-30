module.exports = {
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
}
