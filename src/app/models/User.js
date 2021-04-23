import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';


class User extends Model {
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
      cpf: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
    },
    {
      sequelize,
      tableName: 'users'
    });


    this.addHook('beforeSave', async (user) => {
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 10);
      }
    });

    return this;
  }

  static associate( models ){
    this.belongsTo( models.Permission, { foreignKey: 'permission_id', as: 'permission'} )
  }

  async checkPassword(password){
    return await bcrypt.compare(password, this.password_hash);
  }

}

export default User;