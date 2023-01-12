export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodbUri: process.env.MONGODB_URI,

  // + lo requeire x el joi, xq si no viene, joi lo inserta y es una string
  port: +process.env.PORT || 3300,
  defaultLimit: +process.env.DEFAULT_LIMIT || 10,
});
