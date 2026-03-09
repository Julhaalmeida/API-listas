const mongoose = require('mongoose')

async function connectDB() {
  try {
    console.log('cwd:', process.cwd())
    console.log('MONGO_URI no database.js:', process.env.MONGO_URI)

    const uri = process.env.MONGO_URI

    if (!uri) {
      throw new Error('MONGO_URI não foi definida no .env')
    }

    await mongoose.connect(uri)
    console.log('MongoDB conectado')
  } catch (error) {
    console.error('Erro ao conectar MongoDB:', error.message)
    process.exit(1)
  }
}

module.exports = connectDB
