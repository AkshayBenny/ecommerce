import express from 'express'
import path from 'path'
import connectDB from './config/db.js'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import uploadRoute from './routes/uploadRoute.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()
connectDB()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/admin', adminRoutes)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/upload', uploadRoute)

//__dirname is not available when ES modules are used so the below method is used to bypass this problem

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
