import express from 'express';
import { createCatalogo, getCatalogos, getCatalogoById, getCatalogoByNome } from '../controllers/catalogoController.js';

const router = express.Router();

router.post('/catalogo', createCatalogo);
router.get('/catalogos', getCatalogos);
router.get('/catalogo/:produto', getCatalogoByNome);
router.get('/catalogo/id/:id', getCatalogoById);

export default router;