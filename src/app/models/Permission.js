import Sequelize, { Model } from 'sequelize';

class Permission extends Model {
  static init(sequelize){
    super.init({
      role: Sequelize.STRING,
      permission: Sequelize.STRING,
    },
    {
      sequelize,
      tableName: 'permissions'
    });

    return this;
  }

  static associate( models ){
    this.hasMany( models.User, { 
      foreignKey: 'permission_id',
      as: 'users',
      onDelete: 'cascade',
      onUpdate: 'cascade',
      hooks:true} )
  }
}

export default Permission;