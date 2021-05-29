import { ConnectionOptions } from 'typeorm';
import { Sync } from './models/sync';
import { User } from './models/user'

const dbConfig: ConnectionOptions = {
  entities: [ User, Sync ],
  host: process.env.POSTGRES_HOST || 'localhost',
  password: 'postgres',
  port: 5432,
  synchronize: true,
  type: 'postgres',
  username: 'postgres',
};

export default dbConfig;
