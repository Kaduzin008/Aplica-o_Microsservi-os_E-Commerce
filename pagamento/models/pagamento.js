import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Pagamento = db.define('tb_pagamento', {
    id_pagamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    valor_final: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    pagante: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: true //Mostra o createdAt e updatedAt 
});

export default Pagamento;