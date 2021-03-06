import { promisify } from 'util';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).json({ error: 'Token not provider.'});
  }
  
  const [, token] = authHeader.split(' ');
    
  try{
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);

      req.user_id = decoded.id;

      next()
  }catch(err){
      console.log(err)
      return res.status(401).json({ error: 'Token invalid.'})
  }
}
// export default async (req, res, next) => {
//   next()
// }
