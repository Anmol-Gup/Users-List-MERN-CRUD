const mongoose=require('mongoose')

const connectDB=async url=>{
    mongoose.connect(url)
    .then(()=>console.log("Connection Successful!"))
    .catch(err=>console.log(err.message))
}

module.exports=connectDB
