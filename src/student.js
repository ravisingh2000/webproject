const { json } = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const students = new mongoose.Schema({
        "FirstName": String,
        "LastName": String,
        "email": String,
        "txtEmpPhone": Number,
        "Password": String,
        "ConfirmPassword": String,
        "College":String,
        "Security": String,
        "Answer": String

});
students.pre("save", async function (next) {
        console.log(this.Password + "JKJHJKJJJJJJHHHHHHHHHJJJJJJJJJJJJJJJJJJJJJJJJ")
        this.Password = await bcrypt.hash(this.Password, 10)

        next();
})
students.pre("updateOne", async function (next) {
        try{
        const data = this.getUpdate().$set.Password = await bcrypt.hash(this.getUpdate().$set.Password, 10);
        }
        catch(error){

        }
        next();
})
const student = new mongoose.model("students", students);
module.exports = student;