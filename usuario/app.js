import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(usuarioRoutes);

const PORT = process.env.PORT || 3001;

db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Serviço de Usuário rodando na porta ${PORT}`);
    });
}).catch(err => console.log("Erro ao conectar ao banco de Usuarios:", err));