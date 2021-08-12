const mongoose = require('mongoose')
console.log()
mongoose.connect(process.env.DB, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log("sucessfull")
}).catch(() => {
    console.log("unsucessfull")
})