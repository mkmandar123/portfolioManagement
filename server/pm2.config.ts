const path = require('path');
const env = require('dotenv').config({ path: path.join(path.normalize(`${__dirname}/../`), '.env') }).parsed;

module.exports = {
  apps: [{
    name: 'portfolio-management',
    script: './app.js',
    exec_mode: 'cluster',
    instances: Number(env.INSTANCE_APP) || 1,
    env,
  }],
};
