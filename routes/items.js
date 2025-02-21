const express = require('express')
const router = express.Router()
const db = require('../config/db') // Asegúrate de ajustar la ruta según la ubicación de tu archivo db.js

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Obté tots els items
 *     description: Retorna una llista de tots els items disponibles a la base de dades.
 *     tags:
 *       - Items
 *     responses:
 *       200:
 *         description: Llista d'items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nom:
 *                     type: string
 *                   descripcio:
 *                     type: string
 *                   preu:
 *                     type: number
 *                     format: float
 *       500:
 *         description: Error en obtenir els items.
 */
router.get('/', (req, res) => {
  const query = 'SELECT * FROM items'
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(results)
  })
})

/**
 * @swagger
 * /items/items_usuaris:
 *   post:
 *     summary: Realitza una compra d'ítems per un usuari
 *     description: Permet a un usuari comprar ítems restando el cost en BTC i actualitzant la seva quantitat de ítems.
 *     tags:
 *       - Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID de l'usuari que realitza la compra.
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     itemId:
 *                       type: integer
 *                       description: ID de l'ítem que es vol comprar.
 *                     quantitat:
 *                       type: integer
 *                       description: Quantitat de l'ítem a comprar.
 *               totalCost:
 *                 type: number
 *                 format: float
 *                 description: Cost total de la compra en BTC.
 *     responses:
 *       200:
 *         description: Compra realitzada amb èxit.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Compra realitzada amb èxit.
 *       400:
 *         description: Error en la compra, per exemple, saldo insuficient o usuari no trobat.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Saldo insuficient.
 *       500:
 *         description: Error intern del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Error al realitzar la compra.
 */
router.post('/items_usuaris', async (req, res) => {
  const { userId, items, totalCost } = req.body
  try {
    const usuario = await new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM usuaris WHERE id = ?',
        [userId],
        (err, result) => {
          if (err) reject(err)
          resolve(result[0])
        },
      )
    })

    if (!usuario) {
      throw new Error('Usuario no encontrado')
    }

    if (usuario.btc < totalCost) {
      throw new Error('Saldo insuficiente')
    }

    await new Promise((resolve, reject) => {
      db.query(
        'UPDATE usuaris SET btc = btc - ? WHERE id = ?',
        [totalCost, userId],
        (err, result) => {
          if (err) reject(err)
          resolve(result)
        },
      )
    })

    for (const item of items) {
      const { itemId, quantitat } = item
      const existingItem = await new Promise((resolve, reject) => {
        db.query(
          'SELECT * FROM items_usuaris WHERE usuari_id = ? AND item_id = ?',
          [userId, itemId],
          (err, result) => {
            if (err) reject(err)
            resolve(result[0])
          },
        )
      })

      if (existingItem) {
        await new Promise((resolve, reject) => {
          db.query(
            'UPDATE items_usuaris SET quantitat = quantitat + ? WHERE usuari_id = ? AND item_id = ?',
            [quantitat, userId, itemId],
            (err, result) => {
              if (err) reject(err)
              resolve(result)
            },
          )
        })
      } else {
        await new Promise((resolve, reject) => {
          db.query(
            'INSERT INTO items_usuaris (usuari_id, item_id, quantitat) VALUES (?, ?, ?)',
            [userId, itemId, quantitat],
            (err, result) => {
              if (err) reject(err)
              resolve(result)
            },
          )
        })
      }
    }

    res.json({ success: true, message: 'Compra realizada con éxito' })
  } catch (error) {
    console.error('Error en la compra:', error.message)
    res.status(400).json({ success: false, error: error.message })
  }
})

module.exports = router
