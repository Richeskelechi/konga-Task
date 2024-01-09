// src/validation/userValidation.ts
import Joi from 'joi';
import { UserData, UserDataLogin } from '../types/userTypes';

export const validateUserData = (userData: UserData): { valid: boolean; errors?: string | string[] } => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required().messages({
      'string.min': 'First name must be at least {#limit} characters',
      'string.max': 'First name must be at most {#limit} characters',
      'any.required': 'First name is required',
    }),
    lastName: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Last name must be at least {#limit} characters',
      'string.max': 'Last name must be at most {#limit} characters',
      'any.required': 'Last name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(4).required().messages({
      'string.min': 'Password must be at least {#limit} characters',
      'any.required': 'Password is required',
    }),
    role: Joi.string().valid('user', 'admin').required().messages({
      'any.only': 'Invalid role. Must be either "user" or "admin"',
      'any.required': 'Role is required',
    }),
  });

  const { error } = schema.validate(userData);

  if (error) {
    const firstErrorMessage = error.details[0].message;
    return { valid: false, errors: firstErrorMessage };
  }
  return { valid: true };
};

export const validateUserLoginData = (userData: UserDataLogin): { valid: boolean; errors?: string | string[] } => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(4).required().messages({
      'string.min': 'Password must be at least {#limit} characters',
      'any.required': 'Password is required',
    }),
  });

  const { error } = schema.validate(userData);

  if (error) {
    const firstErrorMessage = error.details[0].message;
    return { valid: false, errors: firstErrorMessage };
  }
  return { valid: true };
};

export const validateUpdateUserData = (userData: UserData) => {
  const schema = Joi.object({
      // Include the properties you want to allow for updating
      firstName: Joi.string().min(2).max(50),
      lastName: Joi.string().min(2).max(50),
      email: Joi.string().email(),
      role: Joi.string().valid('user', 'admin'),
      // Add more properties as needed
  });

  const { error } = schema.validate(userData);

  if (error) {
      return { valid: false, errors: error.details.map((detail) => detail.message) };
  }

  return { valid: true };
};
