const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

const express = require('express')
const connectDB = require('./config/database')
const orderRoutes = require('./routes/orderRoutes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/order', orderRoutes)

app.get('/', (req, res) => {
  res.send('API de pedidos rodando')
})

async function startServer() {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
  })
}

startServer()
