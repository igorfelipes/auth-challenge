import User from '../../models/User';
import { generateToken } from '../../../utils/auth';

class UserSessionController{
  async store(req, res){
    const { cpf, password } = req.body;
    
    var user = await User.findOne({
    where: { cpf }, 
    include: [
      { association: 'permission' },
    ]
    });

    if(!user){
      return res.status(401).json({ error: 'CPF not registered'});
    }

    if(!(await user.checkPassword(password))){
      return res.status(401).json({ error: 'Password does not match'});
    }

    const { id } = user;

    return res.json({
      user,
      token: generateToken({ id }),
    })
  
  }
}

export default new UserSessionController();