const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

//set template engine
server.set("view engine", "ejs")

//chance view folder location change
server.set('views', path.join(__dirname, 'views'))

//hab static files 
server.use(express.static("public"))

//use req.body
server.use(express.urlencoded({ extended: true }))

//routes
server.use(routes)

server.listen(3000)