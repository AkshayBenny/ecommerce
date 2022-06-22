import express from 'express'
import connectDB from './config/db.js'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

const app = express()
app.use(cors())
dotenv.config()
connectDB()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.send('Api is running')
})

app.use('/api/products', productRoutes)

//error handling
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
