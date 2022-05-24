import dotenv from 'dotenv';
import Category from './src/entities/category';
import Product from './src/entities/product';
import User from './src/entities/user';

dotenv.config();

const devEnv = {
  type: 'postgres',
  host: 'localhost',
  port: process.env.PGPORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: false,
  entities: ['src/entities/**/*.*'],
  migrations: ['src/migrations/**/*.*'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
};

const testEnv = {
  type: 'postgres',
  host: 'localhost',
  port: process.env.PGPORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: 'tag_fs_test_database',
  synchronize: true,
  dropSchema: true,
  runMigrations: true,
  entities: [User, Category, Product],
  migrations: ['src/migrations/**/*.*'],
  cli: {
    entitiesDir: '../src/entities',
    migrationsDir: '../src/migrations',
  },
};

export default process.env.NODE_ENV === 'test' ? testEnv : devEnv;
