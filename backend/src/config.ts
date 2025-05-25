export default () => ({
  DB: {
    port: parseInt(process.env.DB_PORT as string, 10), // ensure the port is a Integer
    user: process.env.DB_USER,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  },
});
