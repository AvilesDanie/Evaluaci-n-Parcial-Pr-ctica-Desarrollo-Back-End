import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import bcrypt from 'bcrypt';

class Usuario extends Model {
  public id!: number;
  public nombreUsuario!: string;
  public contacto!: string;
  public contrasena!: string;

  
  public async validarContrasena(contrasena: string): Promise<boolean> {
    return bcrypt.compare(contrasena, this.contrasena);
  }
}

Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombreUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contacto: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuarios',
  timestamps: true,
  hooks: {
    beforeCreate: async (usuario) => {
      if (usuario.contrasena) {
        const salt = await bcrypt.genSalt(10);
        usuario.contrasena = await bcrypt.hash(usuario.contrasena, salt);
      }
    }
  }
});

export default Usuario;
