'use strict';
const expect = require('chai').expect;
const schema = require('../graphql/rootSchema');
const graphql = require('graphql-sync').graphql;
const Source = require('graphql-sync/node_modules/graphql/language/source').Source;
const parse = require('graphql-sync/node_modules/graphql/language/parser').parse;
const validate = require('graphql-sync/node_modules/graphql/validation/validate').validate;

function validationErrors(query) {
  const source = new Source(query, 'proto.graphql');
  const ast = parse(source);
  return validate(schema, ast);
}

describe('Alpheios Validation Tests', function () {
  describe('Basic Queries', function () {
    it('Validates a query', function () {
      const query = `
        query lemmasForWord {
          lemmasForWord
        }
      `;
      expect(validationErrors(query)).to.be.empty;
    });
  });
});
