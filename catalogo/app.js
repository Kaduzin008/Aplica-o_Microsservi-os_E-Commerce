import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';
import catalogoRoutes from './routes/catalogoRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(catalogoRoutes);

const PORT = process.env.PORT || 3003;

db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Serviço de Catálogo rodando na porta ${PORT}`);
    });
}).catch(err => console.log("Erro ao conectar no banco de Catálogo:", err));