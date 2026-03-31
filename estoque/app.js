import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';
import estoqueRoutes from './routes/estoqueRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Registro das rotas
app.use(estoqueRoutes);

const PORT = process.env.PORT || 3004;

db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Serviço de Estoque rodando na porta ${PORT}`);
    });
}).catch(err => console.log("Erro no banco de Pedidos:", err));