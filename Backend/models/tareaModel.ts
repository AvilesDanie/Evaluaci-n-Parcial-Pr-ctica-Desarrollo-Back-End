import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import Usuario from './usuarioModel';

export class Tarea extends Model {
  public id!: number;
  public nombre!: string;
  public descripcion!: string;
  public usuarioId!: number;
  public fechaCreacion!: Date;
  public fechaFinalizacion!: Date | null;
  public estado!: 'no iniciado' | 'en proceso' | 'finalizado';

}

Tarea.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuarios',
        key: 'id',
      }
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    fechaFinalizacion: {
      type: DataTypes.DATE,
    },
    estado: {
      type: DataTypes.ENUM('no iniciado', 'en proceso', 'finalizado'),
      allowNull: false,
    },
  }, {  
  sequelize,
  modelName: 'Tarea',
  tableName: 'tareas',
  timestamps: true,
  createdAt: 'fechaCreacion',
  updatedAt: false,
});

Tarea.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'Usuario' });

sequelize.sync().then(() => {
  console.log('Tareas table created.');
});


export default Tarea;
