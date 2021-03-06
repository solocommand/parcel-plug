const {
  cleanEnv,
  makeValidator,
  port,
} = require('envalid');

const nonemptystr = makeValidator((v) => {
  const err = new Error('Expected a non-empty string');
  if (v === undefined || v === null || v === '') {
    throw err;
  }
  const trimmed = String(v).trim();
  if (!trimmed) throw err;
  return trimmed;
});

module.exports = cleanEnv(process.env, {
  ACCOUNT_KEY: nonemptystr({ desc: 'The account/tenant key. Is used for querying the account information and settings from the core database connection.' }),
  MONGO_DSN: nonemptystr({ desc: 'The MongoDB DSN to connect to.' }),
  REDIS_DSN: nonemptystr({ desc: 'The Redis DSN to connect to.' }),
  INTERNAL_PORT: port({ desc: 'The internal port that express will run on.' }),
  EXTERNAL_PORT: port({ desc: 'The external port that express is exposed on.' }),
  GRAPHQL_ENDPOINT: nonemptystr({ desc: 'The endpoint that GraphQL will use.', default: '/graphql' }),
});
