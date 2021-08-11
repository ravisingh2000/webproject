require('dotenv').config()
const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const path = require("path");
const cookieParser = require("cookie-parser")
const port=process.env.PORT || 8000
require("./conect")
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "../public")))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "../views"))
const students = require("./student");
const { getMaxListeners } = require("process");
app.get("/", async (req, res) => {
        try {
                const token = req.cookies.mainproject;
                console.log(token);
                console.log(process.env.SECRET_KEY);
                const verify = await jwt.verify(token, process.env.SECRET_KEY);
                const data = await students.findOne({ email: verify.email });
                res.render("profile", { name: "ravi singh", firstname: data.FirstName, lastname: data.Lastname, email: data.email, txtEmpPhone: data.txtEmpPhone });
        }
        catch (e) {
                console.log(e)
                res.sendFile(path.join(__dirname, "/index.html"))
        }
})
app.post("/register", async (req, res, next) => {

        console.log(req.body)

        if (req.body.password == req.body.cnpassword) {
                try {
                        
                        const submit = new students({
                                "FirstName": req.body.firstname,
                                "LastName": req.body.lastname,
                                "email": req.body.email,
                                "txtEmpPhone": req.body.txtEmpPhone,
                                "Password": req.body.password,
                                "Security": req.body.Securitykey,
                                "Answer": req.body.answer
                        })
                        const nn=await submit.save();
                        console.log(nn+"jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
                        console.log("errr")
                        res.sendFile(path.join(__dirname, "../public/login.html"))
                        console.log(path.join(__dirname, "../public/login.html"))
                }
                catch (e) {
                        res.status(404).send("IncorectPassword!")
                }
        }
        else {
                res.sendFile(path.join(__dirname, "../public/defect.html"))
                   
        }


})
app.get("/public/defect.html", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/home.html"))
        

})
app.post("/home", async (req, res) => {
        try {
                console.log(req.body.password)
                const data = await students.findOne({ email: req.body.email });
                console.log(data)
                const bcryptpassword = await bcrypt.compare(req.body.password, data.Password);
                console.log(bcryptpassword + "jjjj");
                if (bcryptpassword == true) {
                        const token = jwt.sign({ email: req.body.email }, "ravisingh")
                        console.log(token)
                        res.cookie("mainproject", token,
                                {maxAge:31536000000}
                        );
                        res.render("profile", { name: "ravi singh", firstname: data.FirstName, lastname: data.LastName, email: data.email, phone: data.txtEmpPhone })
                }
                else {
                        res.sendFile(path.join(__dirname, "../public/defect.html"));
                        

                }
        }
        catch (error) {
                res.sendFile(path.join(__dirname, "../public/home.html"));
        }
})
app.get("/login",async(req,res)=>{
        res.sendFile(path.join(__dirname,"../public/login.html"))
})
app.post("/update", async (req, res, next) => {

        if (req.body.password == req.body.password_confirmation) {
                try{
                let data = await students.findOne({ email: req.body.email });     
                const bcryptpassword = await bcrypt.compare(req.body.password, data.Password);
                console.log(bcryptpassword + "jjjj");
                //halka
                data = await students.updateOne({ email: req.body.email }, {
                        $set: {
                                "FirstName": req.body.firstname,
                                "LastName": req.body.lastname,
                                "email": req.body.email,
                                "txtEmpPhone": req.body.Phone,
                                "Password": bcryptpassword,
                                "Security": req.body.Securitykey,
                                "Answer": req.body.answer
                        }
                })
                console.log(data)
                res.render("profile", { name: "ravi singh", firstname: data.FirstName, lastname: data.lastname, email: data.email, txtEmpPhone: data.txtEmpPhone })
        }
        catch(error){
                console.log(error)
                res.sendFile(path.join(__dirname,"../public/defect.html"))
      
        }
}        else {
                  res.sendFile(path.join(__dirname,"../public/defect.html"))
        }


})
app.get("/signout",async(req,res)=>{
           res.clearCookie("mainproject");
           res.sendFile(path.join(__dirname,"../public/login.html"))
        
})
app.listen(port, () => {
        console.log("Server start at: " + "http://localhost:"+port+"/")

})