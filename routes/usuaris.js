const express = require('express')
const router = express.Router()
const db = require('../config/db') // Asegúrate de ajustar la ruta según la ubicación de tu archivo db.js

/**
 * @swagger
 * /usuaris:
 *   get:
 *     summary: Obté tots els usuaris
 *     description: Retorna una llista de tots els usuaris registrats.
 *     tags:
 *       - Usuaris
 *     responses:
 *       200:
 *         description: Llista d'usuaris obtinguda correctament.
 *       500:
 *         description: Error en obtenir els usuaris.
 */
router.get('/', (req, res) => {
  const query = 'SELECT * FROM usuaris'
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(results)
  })
})

/**
 * @swagger
 * /usuaris/{id}:
 *   get:
 *     summary: Obté un usuari per ID
 *     description: Retorna les dades d'un usuari específic pel seu ID.
 *     tags:
 *       - Usuaris
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'usuari a obtenir.
 *     responses:
 *       200:
 *         description: Usuari obtingut correctament.
 *       404:
 *         description: Usuari no trobat.
 *       500:
 *         description: Error en obtenir l'usuari.
 */
router.get('/:id', (req, res) => {
  const { id } = req.params
  const query = 'SELECT * FROM usuaris WHERE id = ?'
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Usuari no trobat' })
    }
    res.json(result[0])
  })
})

/**
 * @swagger
 * /usuaris:
 *   post:
 *     summary: Crea un nou usuari
 *     description: Afegeix un nou usuari a la base de dades.
 *     tags:
 *       - Usuaris
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               correu:
 *                 type: string
 *               contrasenya:
 *                 type: string
 *               edat:
 *                 type: integer
 *               nacionalitat:
 *                 type: string
 *               codiPostal:
 *                 type: string
 *               imatgePerfil:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuari creat correctament.
 *       500:
 *         description: Error en crear l'usuari.
 */
router.post('/', (req, res) => {
  const {
    nom,
    correu,
    contrasenya,
    edat,
    nacionalitat,
    codiPostal,
    imatgePerfil,
  } = req.body
  const query =
    'INSERT INTO usuaris (nom, correu, contrasenya, edat, nacionalitat, codiPostal, imatgePerfil) VALUES (?, ?, ?, ?, ?, ?, ?)'
  db.query(
    query,
    [nom, correu, contrasenya, edat, nacionalitat, codiPostal, imatgePerfil],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      res.status(201).json({
        id: result.insertId,
        nom,
        correu,
        contrasenya,
        edat,
        nacionalitat,
        codiPostal,
        imatgePerfil,
      })
    },
  )
})

/**
 * @swagger
 * /usuaris/{id}:
 *   put:
 *     summary: Actualitza un usuari
 *     description: Modifica la informació d'un usuari existent.
 *     tags:
 *       - Usuaris
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'usuari a actualitzar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               correu:
 *                 type: string
 *               contrasenya:
 *                 type: string
 *               edat:
 *                 type: integer
 *               nacionalitat:
 *                 type: string
 *               codiPostal:
 *                 type: string
 *               imatgePerfil:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuari actualitzat correctament.
 *       500:
 *         description: Error en actualitzar l'usuari.
 */
router.put('/:id', (req, res) => {
  const { id } = req.params
  const {
    nom,
    correu,
    contrasenya,
    edat,
    nacionalitat,
    codiPostal,
    imatgePerfil,
  } = req.body
  const query =
    'UPDATE usuaris SET nom = ?, correu = ?, contrasenya = ?, edat = ?, nacionalitat = ?, codiPostal = ?, imatgePerfil = ? WHERE id = ?'
  db.query(
    query,
    [
      nom,
      correu,
      contrasenya,
      edat,
      nacionalitat,
      codiPostal,
      imatgePerfil,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      res.json({ message: 'Usuari actualitzat correctament' })
    },
  )
})

/**
 * @swagger
 * /usuaris/{id}:
 *   delete:
 *     summary: Elimina un usuari
 *     description: Elimina un usuari de la base de dades per l'ID proporcionat.
 *     tags:
 *       - Usuaris
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'usuari a eliminar.
 *     responses:
 *       200:
 *         description: Usuari eliminat correctament.
 *       500:
 *         description: Error en eliminar l'usuari.
 */
router.delete('/:id', (req, res) => {
  const { id } = req.params
  const query = 'DELETE FROM usuaris WHERE id = ?'
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json({ message: 'Usuari eliminat correctament' })
  })
})

/**
 * @swagger
 * /usuaris/correu/{correu}:
 *   get:
 *     summary: Cerca un usuari per correu
 *     description: Retorna un usuari basat en l'adreça de correu proporcionada.
 *     tags:
 *       - Usuaris
 *     parameters:
 *       - in: path
 *         name: correu
 *         required: true
 *         schema:
 *           type: string
 *         description: Correu de l'usuari a buscar.
 *     responses:
 *       200:
 *         description: Usuari trobat.
 *       404:
 *         description: Usuari no trobat.
 *       500:
 *         description: Error en la cerca de l'usuari.
 */
router.get('/correu/:correu', (req, res) => {
  const { correu } = req.params
  const query = 'SELECT * FROM usuaris WHERE correu = ?'
  db.query(query, [correu], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Usuari no trobat' })
    }
    res.json(result[0])
  })
})

/**
 * @swagger
 * /usuaris/btc/{userId}:
 *   put:
 *     summary: Actualitza el saldo de BTC d'un usuari
 *     description: Permet actualitzar el saldo de BTC d'un usuari específic.
 *     tags:
 *       - Usuaris
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Saldo actualitzat amb èxit.
 *       400:
 *         description: Error en actualitzar el saldo.
 *       500:
 *         description: Error intern del servidor.
 */
router.put('/btc/:userId', async (req, res) => {
  const { userId } = req.params
  const { amount } = req.body
  try {
    await new Promise((resolve, reject) => {
      db.query(
        'UPDATE usuaris SET btc = btc + ? WHERE id = ?',
        [amount, userId],
        (err, result) => {
          if (err) reject(err)
          resolve(result)
        },
      )
    })
    res.json({ success: true, message: 'Saldo actualizado con éxito' })
  } catch (error) {
    console.error('Error al actualizar saldo:', error.message)
    res.status(400).json({ success: false, error: error.message })
  }
})

module.exports = router
