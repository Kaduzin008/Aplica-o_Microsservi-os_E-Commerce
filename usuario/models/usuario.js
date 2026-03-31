import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Usuario = db.define('tb_usuario',{
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: true //Mostra o createdAt e updatedAt 
});

export default Usuario;