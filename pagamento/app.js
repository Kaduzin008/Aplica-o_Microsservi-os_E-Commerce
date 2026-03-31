import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';
import pagamentoRoutes from './routes/pagamentoRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Registro das rotas
app.use(pagamentoRoutes);

const PORT = process.env.PORT || 3005;

db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Serviço de Pagamentos rodando na porta ${PORT}`);
    });
}).catch(err => console.log("Erro no banco de Pagamentos:", err));