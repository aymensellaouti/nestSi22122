export const prodConfig = () => ({
  db: {
    db: {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
    },
  },
  global: {
    port: 3000,
  },
});
