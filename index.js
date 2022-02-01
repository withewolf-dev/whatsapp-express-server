const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const testRoutes = require('./routes/testRoutes')
const cookieParser = require('cookie-parser')

const cors = require('cors')

const { notFound, errorHandler } = require('./middleware/errorMiddileware')

dotenv.config()
connectDB()
const app = express()

app.use(cookieParser())

app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }))

app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/test', testRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, console.log('Server started on port 5000'.yellow.bold))
