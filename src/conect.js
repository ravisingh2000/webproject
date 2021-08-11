//const db='mongodb+srv://ravi:Computer@123@cluster0.aavpk.mongodb.net/meanstack?retryWrites=true&w=majority'
//require('dotenv').config()

const mongoose=require('mongoose')
console.log()
mongoose.connect(process.env.DB,{useUnifiedTopology: true, useNewUrlParser: true}).then(()=>{
    console.log("sucessfull")
}).catch(()=>{
    console.log("unsucessfull")
})