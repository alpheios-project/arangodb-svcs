'use strict';

const db = require('@arangodb').db;
const cnames = require('./collections');

for (const name of cnames.documentCollections) {
  const ctxName = module.context.collectionName(name);
  if (!db._collection(ctxName)) {
    const coll = db._createDocumentCollection(ctxName);
    if (cnames.fixturesNodes[name]) {
      cnames.fixturesNodes[name].forEach( (item) => {
        coll.save(item);
      });
    }
  }
}

const replace_node_key = (key) => {
  const match = key.match(/(CTX_(.*?))\//);
  if (match) {
    const cname = match[2];
    const repl = match[1];
    const ctx = module.context.collectionName(cname);
    return key.replace(repl,ctx);
  }

};
let doEdgeFixtures = {};
for (const name of cnames.edgeCollections) {
  const ctxName = module.context.collectionName(name);
  if (!db._collection(ctxName)) {
    const coll = db._createEdgeCollection(ctxName);
    doEdgeFixtures[name] = true;
  }
};

for (const dataset of cnames.fixturesEdges) {
  if (doEdgeFixtures[dataset.cname]) {
    const coll = module.context.collection(dataset.cname)
    dataset.data.forEach( (item) => {
      item._from = replace_node_key(item._from);
      item._to = replace_node_key(item._to);
      coll.save(item);
    });
  }
};


