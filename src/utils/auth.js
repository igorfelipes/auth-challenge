import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';

export function generateToken( params={ }){
  return jwt.sign(params, authConfig.secret, {
    expiresIn: authConfig.expireIn,
  });
}