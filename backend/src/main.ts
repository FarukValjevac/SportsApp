import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const databaseName = process.env.DB_NAME;
  let dataSource: DataSource;
  // Attempt to create the database if it doesn't exist

  try {
    dataSource = new DataSource({
      type: 'mysql',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT as string, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: '', // Connect without specifying a database initially. Connection is made in app.module.ts
    });
    await dataSource.initialize();

    const databaseExists: Array<{ [key: string]: string }> =
      await dataSource.query(
        `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${databaseName}'`,
      );

    if (databaseExists?.length === 0) {
      await dataSource.query(`CREATE DATABASE \`${databaseName}\`;`);
      console.log(`Database '${databaseName}' created.`);
    } else {
      console.log(`Database '${databaseName}' already exists.`);
    }

    await dataSource.destroy(); // Close the connection used for database creation
  } catch (error) {
    console.error('Error creating or checking database:', error);
    // Continue bootstrapping the app even if database creation fails
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(parseInt(process.env.PORT as string, 10));
}

bootstrap();
