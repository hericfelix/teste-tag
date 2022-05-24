import { MigrationInterface, QueryRunner } from 'typeorm';

export class seed1653429799180 implements MigrationInterface {
  name = 'seed1653429799180';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users(email, name, password) VALUES ('admin@admin.com', 'admin', 'admin123')`
    );
    await queryRunner.query(
      `INSERT INTO categories(name) VALUES ('eletrônicos'), ('beleza'), ('música')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM users`);
    await queryRunner.query(`DELETE * FROM categories`);
  }
}
