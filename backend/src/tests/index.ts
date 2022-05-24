import { faker } from '@faker-js/faker';
import { createConnection, getConnection } from 'typeorm';
import { Status } from '../ts/enums';
import { createDatabase, dropDatabase } from 'typeorm-extension';
import 'reflect-metadata';

const generateProduct = () => {
  const name = faker.commerce.product();
  const status: Status = [Status.A, Status.I, Status.D][
    Math.floor(Math.random() * 3)
  ];
  const category = faker.commerce.department();

  return {
    name,
    status,
    category,
  };
};

const generateUser = () => {
  const name = faker.name.firstName();
  const email = faker.internet.email(name).toLowerCase();
  const password = faker.random.alphaNumeric(6);

  return {
    name,
    email,
    password,
  };
};

const generateCategory = () => {
  const name = faker.commerce.department();

  return { name };
};

const slowDown = () =>
  new Promise((resolve, reject) => setTimeout(() => resolve('slowDown'), 500));

class ConnectionTestJest {
  static create = async () => {
    await createDatabase({ ifNotExist: true, synchronize: true });
    const conn = await createConnection('default');

    await conn.synchronize();
  };

  static close = async () => {
    await getConnection('default').close();
  };

  static clear = async () => {
    const connection = getConnection('default');
    const entities = connection.entityMetadatas;

    await new Promise((resolve, _) =>
      resolve(
        entities.forEach(async (entity) => {
          const repository = connection.getRepository(entity.name);
          await repository.query(`DELETE FROM ${entity.tableName}`);
        })
      )
    );
  };
}

export {
  generateProduct,
  generateUser,
  ConnectionTestJest,
  generateCategory,
  slowDown,
};
