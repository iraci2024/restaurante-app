const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// Criar um novo pedido (usuário autenticado)
router.post('/', auth, async (req, res) => {
  try {
    const { items, total } = req.body;
    const order = new Order({ user: req.user._id, items, total });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar pedido', error: error.message });
  }
});

// Obter todos os pedidos de um usuário (usuário autenticado)
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.menuItem');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedidos', error: error.message });
  }
});

// Obter todos os pedidos (apenas admin)
router.get('/', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Acesso negado' });
  }
  try {
    const orders = await Order.find().populate('user').populate('items.menuItem');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedidos', error: error.message });
  }
});

// Atualizar o status de um pedido (apenas admin)
router.put('/:id', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Acesso negado' });
  }
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar pedido', error: error.message });
  }
});

module.exports = router;
