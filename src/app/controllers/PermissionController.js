import Permission from '../models/Permission';
import User from '../models/User';

const ADMIN_ID = 1;

class PermissionController{

  async index(req, res){

    await verifyPermissions(req, res)

    try{
      const permissions = await Permission.findAll(
        {
          include: [
            { association: 'users' },
          ]
        }
      );

      if(permissions.length === 0){
        return res.status(200).json({
          message: 'not registers'
        })
      }

      return res.json(permissions)
    }catch(err){
      return res.status(400).json({ 
        error: 'Error loading permissions',
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
        const permission = await  Permission.findByPk(id, 
          {
            include: [
              { association: 'users' },
            ]
          }
        )

        if(!permission){
            return res.status(404).json({ error: 'permission not found.'})
        }

        return res.json(permission);
    }catch(err){
        return res.status(401).json({ 
          error: 'Error loading permission. ',
          message: String(err)
        });
    }
  }

  async store(req, res){


    await verifyPermissions(req, res)

    try{
      const { role, permission } =  req.body;

      if(!role || !permission){
        return res.status(401).json({
          error: 'role or permission not provided'
        })
      }

      let permissionExists = await Permission.findOne( {where: { role }});
  
      if(permissionExists){
        return res.status(400).json({ error: 'Role already exists.'})
      }

      const permissionCreated = await Permission.create(req.body);
  
  
      return res.json(permissionCreated)

    }catch(err){
      console.log(err)
      return res.status(400).json({
        error: 'Registration failed',
        message: String(err)
      })
    }
  }

  async update(req, res){

    await verifyPermissions(req, res)

    const { id } =  req.body;

    if(!id){
      return res.status(401).json({
        error: 'Id not provided'
      })
    }

    try{
      
      const permissionData = await Permission.findByPk(id);
      const permissionUpdated = await permissionData.update(req.body);

      return res.json(permissionUpdated)

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

    await verifyPermissions(req, res)

    if(!id){
      return res.status(401).json({
        error: 'Id not provided'
      })
    }

    if(id === ADMIN_ID){
      return res.status(401).json({
        error: 'No permission to remove admin permission. Contact support'
      })
    }

    try{
        const permission = await  Permission.findByPk(id)

        if(!permission){
            return res.status(404).json({ error: 'permission not found.'})
        }

        await permission.destroy()

        return res.json({ message: 'Permission removed successful'})
    }catch(err){
        return res.status(401).json({ 
          error: 'Error remove permission. ',
          message: String(err)
        });
    }
  }
  
}

export default new PermissionController();


const verifyPermissions = async (req, res) => {
  const user = await User.findByPk(req.user_id, {
    include: [
      { association: 'permission' },
    ]
  })

  if(!user){
    return res.json({
      error: 'Request error: User not found with this token user'
    })
  }

  if(user.permission_id != 1){
    return res.status(401).json({
      error: 'Access danied. User not permission access this route'
    })
  }
}