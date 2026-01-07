/* eslint-disable */
require('dotenv').config();

import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.NEST_TYPEORM_HOST,
  port: process.env.NEST_TYPEORM_PORT ? +process.env.NEST_TYPEORM_PORT : 3000,
  username: process.env.NEST_TYPEORM_USERNAME,
  password: process.env.NEST_TYPEORM_PASSWORD,
  database: process.env.NEST_TYPEORM_DATABASE,
  synchronize: process.env.NEST_TYPEORM_SYNCHRONIZE === 'TRUE',
  timezone: 'Z',
};
