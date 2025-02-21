const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const db = require('./config/db') // Importamos la conexión desde config/db.js
const usuarisRoutes = require('./routes/usuaris') // Importamos las rutas de usuaris
const plantasRoutes = require('./routes/plantas') // Importamos las rutas de plantas
const itemsRoutes = require('./routes/items') // Importamos las rutas de items
const { swaggerUi, swaggerDocs } = require('./swagger') // Importamos la configuración de Swagger

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())

// Configuramos Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Usar las rutas de usuaris
app.use('/usuaris', usuarisRoutes)

// Usar las rutas de plantas
app.use('/plantas', plantasRoutes)

// Usar las rutas de items
app.use('/items', itemsRoutes)

// Inicia el servidor
app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor escoltant a totes les interfícies')
  console.log('Documentació disponible en http://localhost:3000/api-docs')
})
