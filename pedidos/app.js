import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Registro das rotas
app.use(pedidoRoutes);

const PORT = process.env.PORT || 3002;

db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Serviço de Pedidos rodando na porta ${PORT}`);
    });
}).catch(err => console.log("Erro no banco de Pedidos:", err));