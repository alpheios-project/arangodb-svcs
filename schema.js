'use strict';
// The graphql-sync module is a thin wrapper around graphql-js
// which provides an identical API except it doesn't use promises
// and instead always resolves synchronously. This allows us to
// use it in Foxx (which doesn't support async resolution).
const gql = require('graphql-sync');
// If you want to use graphql-sync in your own Foxx services
// make sure to install it in the Foxx service's folder using
// the "npm" command-line tool and to include the "node_modules"
// folder when bundling your Foxx service for deployment.
const db = require('@arangodb').db;

// Using module.context.collection allows us to use the
// collection with a common prefix based on where the service
// is mounted. This way we can have multiple copies of this
// service mounted on the same database without worrying about
// name conflicts in their collections.

const lemmaType = new gql.GraphQLObjectType({
  name: 'Lemma',
  description: 'A lemma.',
  fields() {
    return {
      id: {
        type: new gql.GraphQLNonNull(gql.GraphQLString),
        description: 'The id of the lemma.',
        resolve(word) {
          return "http://any";
        }
      },
      form: {
        type: gql.GraphQLString,
        description: 'The written form of the lemma.'
      }
    };
  }
});

const queryType = new gql.GraphQLObjectType({
  name: 'Query',
  fields() {
    return {
      lemmasForWord: {
        type: new gql.GraphQLNonNull(new gql.GraphQLList(lemmaType)),
        args: {
          word: {
            description: 'The word for the lemma.',
            type: new gql.GraphQLNonNull(gql.GraphQLString)
          }
        },
        resolve(root, args) {
          return [{
            id: 'http://any',
            form: 'mare'
          }];
        }
      },
      lemma: {
        type: lemmaType,
        args: {
          word: {
            description: 'The word for the lemma.',
            type: gql.GraphQLString
          }
        },
        resolve(root, args) {
          return {
            id: 'http://any',
            form: 'mare'
          };
        }
      }
    };
  }
});

// This is the GraphQL schema object we need to execute
// queries. See "controller.js" for an example of how it
// is used. Also see the "test" folder for more in-depth
// examples.
module.exports = new gql.GraphQLSchema({
  query: queryType
});