import * as Joi from 'joi';

// Si no viene en las EnvV, estos default los crearan, y todas seran strings
export const JoiValidationSchema = Joi.object({
  MONGODB_URI: Joi.required(),
  PORT: Joi.number().default(3003),
  DEFAULT_LIMIT: Joi.number().default(6),
});
