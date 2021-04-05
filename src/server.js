const express = require("express")
const server = express()
const routes = require("./routes")

//set template engine
server.set("view engine", "ejs")

//hab static files 
server.use(express.static("public"))

//use req.body
server.use(express.urlencoded({ extended: true }))

//routes
server.use(routes)

server.listen(3000, () => console.log("rodando"))