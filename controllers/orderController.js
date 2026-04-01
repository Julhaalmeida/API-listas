const Order = require('../models/orderModel')

function mapIncomingOrder(payload = {}, isPartial = false) {
  const mappedOrder = {}

  if (payload.numeroPedido !== undefined) {
    mappedOrder.orderId = String(payload.numeroPedido)
  }

  if (payload.valorTotal !== undefined) {
    mappedOrder.value = Number(payload.valorTotal)
  }

  if (payload.dataCriacao !== undefined) {
    mappedOrder.creationDate = new Date(payload.dataCriacao)
  }

  if (payload.items !== undefined) {
    if (!Array.isArray(payload.items)) {
      throw new Error('Campo items deve ser um array.')
    }

    mappedOrder.items = payload.items.map((item) => {
      const mappedItem = {
        productId: Number(item.idItem),
        quantity: Number(item.quantidadeItem),
        price: Number(item.valorItem)
      }

      if (
        Number.isNaN(mappedItem.productId) ||
        Number.isNaN(mappedItem.quantity) ||
        Number.isNaN(mappedItem.price)
      ) {
        throw new Error('Itens invalidos: idItem, quantidadeItem e valorItem devem ser numericos.')
      }

      return mappedItem
    })
  }

  if (!isPartial) {
    if (
      !mappedOrder.orderId ||
      Number.isNaN(mappedOrder.value) ||
      !mappedOrder.creationDate
    ) {
      throw new Error('Campos obrigatorios: numeroPedido, valorTotal e dataCriacao.')
    }

    if (Number.isNaN(mappedOrder.creationDate.getTime())) {
      throw new Error('Campo dataCriacao invalido.')
    }
  } else if (
    mappedOrder.creationDate &&
    Number.isNaN(mappedOrder.creationDate.getTime())
  ) {
    throw new Error('Campo dataCriacao invalido.')
  }

  return mappedOrder
}

async function createOrder(req, res) {
  try {
    const mappedOrder = mapIncomingOrder(req.body)
    const order = await Order.create(mappedOrder)

    return res.status(201).json(order)
  } catch (error) {
    if (
      error.message.includes('Campos obrigatorios') ||
      error.message.includes('invalido') ||
      error.message.includes('items deve ser um array') ||
      error.message.includes('Itens invalidos')
    ) {
      return res.status(400).json({ message: error.message })
    }

    if (error.code === 11000) {
      return res.status(409).json({ message: 'Ja existe um pedido com esse numero.' })
    }

    return res.status(500).json({
      message: 'Erro ao criar pedido.',
      error: error.message
    })
  }
}

async function getOrderById(req, res) {
  try {
    const { id } = req.params
    const order = await Order.findOne({ orderId: id })

    if (!order) {
      return res.status(404).json({ message: 'Pedido nao encontrado.' })
    }

    return res.status(200).json(order)
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar pedido.',
      error: error.message
    })
  }
}

async function listOrders(req, res) {
  try {
    const orders = await Order.find().sort({ creationDate: -1 })

    return res.status(200).json(orders)
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao listar pedidos.',
      error: error.message
    })
  }
}

async function updateOrder(req, res) {
  try {
    const { id } = req.params
    const mappedOrder = mapIncomingOrder(req.body, true)

    if (mappedOrder.orderId && mappedOrder.orderId !== id) {
      return res.status(400).json({
        message: 'numeroPedido no body deve ser igual ao parametro da URL.'
      })
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: id },
      mappedOrder,
      { new: true, runValidators: true }
    )

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Pedido nao encontrado.' })
    }

    return res.status(200).json(updatedOrder)
  } catch (error) {
    if (
      error.message.includes('invalido') ||
      error.message.includes('items deve ser um array') ||
      error.message.includes('Itens invalidos')
    ) {
      return res.status(400).json({ message: error.message })
    }

    if (error.code === 11000) {
      return res.status(409).json({ message: 'Ja existe um pedido com esse numero.' })
    }

    return res.status(500).json({
      message: 'Erro ao atualizar pedido.',
      error: error.message
    })
  }
}

async function deleteOrder(req, res) {
  try {
    const { id } = req.params
    const deletedOrder = await Order.findOneAndDelete({ orderId: id })

    if (!deletedOrder) {
      return res.status(404).json({ message: 'O pedido nao foi encontrado.' })
    }

    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao deletar pedido.',
      error: error.message
    })
  }
}

module.exports = {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder
}