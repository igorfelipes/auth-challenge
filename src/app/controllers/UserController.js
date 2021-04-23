import { generateToken } from '../../utils/auth';
import User from '../models/User';
import Permission from '../models/Permission';

class UserController{

  async index(req, res){
    try{
      const users = await User.findAll(
        {
          include: [
            { association: 'permission' },
          ]
        }
      );

      if(users.length === 0){
        return res.status(200).json({
          message: 'not registers'
        })
      }

      return res.json(users)
    }catch(err){
      return res.status(400).json({ 
        error: 'Error loading users',
        message: String(err)
      });
    }
  }

  async show(req, res){
    const { id } = req.body;

    if(!id){
      return res.status(401).json({
        error: 'Id not provided'
      })
    }

    try{
        const user = await  User.findByPk(id, 
          {
            include: [
              { association: 'permission' },
            ]
          }
        )

        if(!user){
            return res.status(404).json({ error: 'user not found.'})
        }

        return res.json(user);
    }catch(err){
        return res.status(401).json({ 
          error: 'Error loading user. ',
          message: String(err)
        });
    }
  }

  async store(req, res){

    try{
      const { cpf, permission_id } =  req.body;

      let userExists = await User.findOne( {where: { cpf }});
  
      if(userExists){
        return res.status(400).json({ error: 'cpf already exists.'})
      }

      let permissionExists = await Permission.findByPk(permission_id);
  
      if(!permissionExists){
        return res.status(400).json({ error: 'Permission not exists'})
      }
      
      const user = await User.create(req.body);
  
      user.password = undefined;
      user.password_hash = undefined;
  
      return res.json({
        user,
        token: generateToken({ id: user.id })
      })

    }catch(err){
      console.log(err)
      return res.status(400).json({
        error: 'Registration failed',
        message: String(err)
      })
    }
  }

  async update(req, res){

    const { cpf, oldpassword, id } =  req.body;


    if(!id){
      return res.status(401).json({
        error: 'Id not provided'
      })
    }

    const user = await User.findByPk(id);

    if(!user){
      return res.status(404).json({ error: 'User not found.'})
    }

    if(cpf && (cpf !== user.cpf)){
      const userExists = await User.findOne( {where: { cpf }});

      if(userExists){
        return res.status(400).json({ error: 'Email already exists.'})
      }
    }

    if(oldpassword && !(await user.checkPassword(oldpassword))){
      return res.status(401).json({ error: 'Password does not match'});
    }

    try{
      
      const userUpdated = await user.update(req.body);

      return res.json(userUpdated)

    }catch(err){
      console.log(err)
      return res.status(400).json({
        error: 'Update error',
        message: String(err)
      })
    }
  }

  async destroy(req, res){
    const { id } = req.body;

    if(!id){
      return res.status(401).json({
        error: 'Id not provided'
      })
    }

    try{
        const user = await  User.findByPk(id)

        if(!user){
            return res.status(404).json({ error: 'User not found.'})
        }

        await user.destroy()

        return res.json({ message: 'User removed successful'})
    }catch(err){
        return res.status(401).json({ 
          error: 'Error remove User. ',
          message: String(err)
        });
    }
  }
  
}

export default new UserController();