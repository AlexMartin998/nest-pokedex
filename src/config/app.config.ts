export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodbUri: process.env.MONGODB_URI,
  port: process.env.PORT || 3300,
  defaultLimit: process.env.DEFAULT_LIMIT || 10,
});