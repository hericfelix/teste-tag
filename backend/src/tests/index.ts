import { faker } from '@faker-js/faker';
import { existsSync } from 'fs';
import { unlink } from 'fs/promises';
import path from 'path';
import { createConnection, getConnection } from 'typeorm';

const generateProduct = () => {
  const name = faker.commerce.product();
  const status = faker.random.alpha(1);
  const category = faker.commerce.department();

  return {
    name,
    status,
    category,
  };
};

const generateUser = () => {
  const firstName = faker.name.firstName();
  const email = faker.internet.email(firstName).toLowerCase();
  const password = faker.random.alphaNumeric(6);

  return {
    firstName,
    email,
    password,
  };
};

class ConnectionTestJest {
  dbPath: string;

  static dbPath = path.join(__dirname, '../../dbTest.sqlite');

  static create = async () => {
    if (existsSync(this.dbPath)) {
      await unlink(this.dbPath);
    }

    await createConnection('default');
  };

  static close = async () => {
    await getConnection('default').close();

    if (existsSync(this.dbPath)) {
      await unlink(this.dbPath);
    }
  };

  static clear = async () => {
    const connection = getConnection('default');
    const entities = connection.entityMetadatas;

    await entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  };
}

export { generateProduct, generateUser, ConnectionTestJest };
