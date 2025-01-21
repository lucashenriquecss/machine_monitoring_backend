import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';

config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  logging: false,
  synchronize: true
};

const dataSource = new DataSource(dataSourceOptions);

dataSource.initialize()
  .then(() => {
    console.log('Entidades carregadas:', dataSourceOptions.entities);

    console.log('Conexão com o banco de dados estabelecida com sucesso')
  })
  .catch(error => console.error('Erro ao conectar ao banco de dados:', error));

export default dataSource;