import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Pedido = db.define('tb_pedidos', {
    id_pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {                 
        type: DataTypes.INTEGER,
        allowNull: false
    },
    produto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qtd_produto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {                     
        type: DataTypes.STRING,
        defaultValue: 'PENDENTE'
    }
}, {
    freezeTableName: true,
    timestamps: true //Mostra o createdAt e updatedAt
});

export default Pedido;