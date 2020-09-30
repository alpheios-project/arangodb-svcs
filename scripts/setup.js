'use strict';

const db = require('@arangodb').db;
const cnames = require('./collections');

for (const name of cnames.documentCollections) {
  const ctxName = module.context.collectionName(name);
  if (!db._collection(ctxName)) {
    db._createDocumentCollection(ctxName);
  }
}

for (const name of cnames.edgeCollections) {
  const ctxName = module.context.collectionName(name);
  if (!db._collection(ctxName)) {
    db._createEdgeCollection(ctxName);
  }
}
