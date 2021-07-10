import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

const root = path.normalize(`${__dirname}/../..`);
const envFile = path.join(root, '.env');
const setupCompleted = fs.existsSync(envFile);
const variables = setupCompleted ? dotenv.config({ path: envFile }) : {};

declare interface EnvJson {
  NODE_ENV: string;
  PORT: string;
  MONGO_URI: string;
}

const rawEnv: any = variables.parsed || variables;

const env: EnvJson = {
  setupCompleted,
  envFile,
  root,
  ...rawEnv,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  SERVER_URL: process.env.SERVER_URL || rawEnv.SERVER_URL,
};

export { env };
