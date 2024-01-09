import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST, // Your database host
  port: Number(process.env.DB_PORT), // Your database port
  username: process.env.DB_USER, // Your database username
  password: process.env.DB_PASSWORD, // Your database password
  database: process.env.DB_NAME, // Your database name
  logging: false, // Set to true if you want to see SQL queries in the console
});

export default sequelize;
