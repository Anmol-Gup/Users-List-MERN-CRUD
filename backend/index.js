require('dotenv').config()
const express=require('express')
const app=express()
const port=process.env.PORT || 3000
const connectDB=require('./connection')
const UserRouter=require('./routes/user')
const cors=require('cors')

connectDB(process.env.MONGODB_URL)

app.use(express.json())
app.use(cors({origin: 'http://127.0.0.1:5173'}))
app.use('/users',UserRouter)

app.listen(port,()=>console.log(`Server is running at port no. ${port}...`))

