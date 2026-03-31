import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Catalogo = db.define('tb_catalogo', {
    id_catalogo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    produto_catalogo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2), // Formato ideal para dinheiro (ex: 800.00)
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: true ////Mostra o createdAt e updatedAt 
});

export default Catalogo;