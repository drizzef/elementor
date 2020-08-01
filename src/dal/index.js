const knex = require('knex');
const configuration = require('./knexfile');
const appConfig = require('../config');

const env = appConfig.env === 'test' ? 'testing' : 'default';

module.exports = knex(configuration[env]);
