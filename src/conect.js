const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/hisar",{useUnifiedTopology: true, useNewUrlParser: true}).then(()=>{
    console.log("sucessfull")
}).catch(()=>{
    console.log("unsucessfull")
})