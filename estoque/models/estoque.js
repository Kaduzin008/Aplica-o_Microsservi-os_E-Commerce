import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Estoque = db.define('tb_estoque', {
    id_estoque: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    produto_estoque: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qtd_estoque: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: true //Mostra o createdAt e updatedAt 
});

export default Estoque;