import { Dialect, Sequelize } from 'sequelize';
import { Config } from './index';
const {
  DB: { DB_DATABASE, DB_DIALECT, DB_HOST, DB_PASSWORD, DB_USERNAME },
} = Config;
const dbName = DB_DATABASE as string;
const dbUser = DB_USERNAME as string;
const dbHost = DB_HOST;
const dbDriver = DB_DIALECT as Dialect;
const dbPassword = DB_PASSWORD;
const  sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Disable SSL verification
      },
    },
  });
const connection = async () => {
  await sequelizeConnection
    .authenticate()
    .then(() => {
      console.log('😀 database connected successfully');
    })
    .catch(async (err: any) => {
      console.log("err", err)
      console.log('database not connected');
    });
};

export { sequelizeConnection, connection };
