"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarea = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const usuarioModel_1 = require("./usuarioModel");
class Tarea extends sequelize_1.Model {
}
exports.Tarea = Tarea;
Tarea.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    usuarioId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id',
        }
    },
    fechaCreacion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    fechaFinalizacion: {
        type: sequelize_1.DataTypes.DATE,
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM('no iniciado', 'en proceso', 'finalizado'),
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'Tarea',
    tableName: 'tareas',
    timestamps: true,
    createdAt: 'fechaCreacion',
    updatedAt: false,
});
Tarea.belongsTo(usuarioModel_1.Usuario, { foreignKey: 'usuarioId', as: 'Usuario' });
database_1.sequelize.sync().then(() => {
    console.log('Tareas table created.');
});
