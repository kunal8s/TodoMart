import jwt from 'jsonwebtoken';

export const generateToken = (userId, email) => {
  const payload = {
    userId,
    email,
  };

  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    issuer: 'todo-mart',
    audience: 'todo-mart-users',
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      issuer: 'todo-mart',
      audience: 'todo-mart-users',
    });
  } catch (error) {
    throw error;
  }
};

export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    throw new Error('Invalid token');
  }
};