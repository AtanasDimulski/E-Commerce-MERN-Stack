const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors');
const multer = require('multer')

//middleware
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const products = require('./routes/products')
const singleProduct = require('./routes/singleProduct')
const auth = require('./routes/auth')
const user = require('./routes/user')
const order = require('./routes/order')
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json())
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
const multipleUploads = upload.array('image')
app.use('/api/v1/products/photo', multipleUploads)
app.use('/api/v1/products/update/variant/photos', multipleUploads)
app.use('/api/v1/products', products)
app.use('/api/v1/singleProduct', singleProduct)
app.use('/api/v1/auth', auth)
app.use('/api/v1/user', user)
app.use('/api/v1/order', order)
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT
const start = async() =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(
            port, 
            console.log(`server is listening on port ${port}...`)
        )
    }catch(err){
        console.log(err)
    }
}

start()