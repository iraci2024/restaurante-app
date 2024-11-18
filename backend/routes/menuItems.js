const express = require('express');
const MenuItem = require('../models/MenuItem');
const auth = require('../middleware/auth');

const router = express.Router();

// Obter todos os itens do menu (público)
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar itens do menu', error: error.message });
  }
});

// Adicionar um novo item ao menu (apenas admin)
router.post('/', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Acesso negado' });
  }
  try {
    const { name, description, price, category, image } = req.body;
    const menuItem = new MenuItem({ name, description, price, category, image });
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao adicionar item ao menu', error: error.message });
  }
});

// Atualizar um item do menu (apenas admin)
router.put('/:id', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Acesso negado' });
  }
  try {
    const { id } = req.params;
    const { name, description, price, category, image } = req.body;
    const menuItem = await MenuItem.findByIdAndUpdate(id, { name, description, price, category, image }, { new: true });
    if (!menuItem) {
      return res.status(404).json({ message: 'Item do menu não encontrado' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar item do menu', error: error.message });
  }
});

// Remover um item do menu (apenas admin)
router.delete('/:id', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Acesso negado' });
  }
  try {
    const { id } = req.params;
    const menuItem = await MenuItem.findByIdAndDelete(id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Item do menu não encontrado' });
    }
    res.json({ message: 'Item do menu removido com sucesso' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao remover item do menu', error: error.message });
  }
});

module.exports = router;
