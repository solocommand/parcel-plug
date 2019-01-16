const { mongo, redis } = require('../connections');
const { log } = require('../utils');

const start = (promise, name, url) => {
  log(`> Connecting to ${name}...`);
  return promise.then((r) => {
    const u = typeof url === 'function' ? url(r) : url;
    log(`> ${name} connected ${u ? `(${u})` : ''}`);
    return r;
  });
};

module.exports = () => Promise.all([
  start(mongo.connect(), 'MongoDB', c => c.s.url),
  start(new Promise((resolve, reject) => {
    redis.on('connect', resolve);
    redis.on('error', reject);
  }), 'Redis', () => redis.options.url),
]);
