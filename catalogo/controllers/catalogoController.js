import Catalogo from '../models/catalogo.js';

// Criar um produto no catalogo
export const createCatalogo = async (req, res) => {
    try {
        const { produto_catalogo, preco } = req.body;
        const novoItem = await Catalogo.create({
            produto_catalogo,
            preco
        }); //Adiciona o produto no catalogo e o preco
        res.status(201).json(novoItem); //Mensagem de sucesso e registra item
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Listar o catalogo
export const getCatalogos = async (req, res) => {
    try {
        const itens = await Catalogo.findAll();
        res.status(200).json(itens);//Lista os TODOS itens do catalogo e retorna mensagem de sucesso
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Listar o catalogo pelo ID
export const getCatalogoById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Catalogo.findByPk(id); //Busca por ID um item especifico
        if (!item) return res.status(404).json({ message: "Produto não encontrado no catálogo" }); //Mensagem de erro se nao achar o item no catalogo
        res.status(200).json(item); //Mensagem de sucesso e o item
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Listar o catalogo por Nome
export const getCatalogoByNome = async (req, res) => {
    try {
        const { produto } = req.params

        const item = await Catalogo.findOne({
            where: { produto_catalogo: produto }
        }); //Procura o catalogo pelo nome especifico

        if (!item) {
            return res.status(404).json({ message: "Produto não encontrado no catálogo" });//Mensagem de erro se nao achar o nome do item no catalogo
        }
        res.status(200).json(item); //Retorna mensagem de sucesso e o item
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}