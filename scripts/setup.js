'use strict';

const db = require('@arangodb').db;
const cnames = require('./collections')

for (const name of cnames.documentCollections) {
  if (!db._collection(name)) {
    db._createDocumentCollection(name);
  }
}

for (const name of cnames.edgeCollections) {
  if (!db._collection(name)) {
    db._createEdgeCollection(name);
  }
}
