import Usuario from '../models/usuario.js'

// Criar um Usuario
export const createUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        res.status(201).json(usuario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Listar todos os usuários
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Buscar um usuário específico pelo ID
export const getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        } 
        res.status(200).json(usuario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};