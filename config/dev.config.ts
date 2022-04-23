export const devConfig = () => ({
  db: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nestsi22122',
  },
  global: {
    port: 3000,
  },
});
