const express = require('express');
const routes = express.Router()

const views = __dirname + "/views/"

const profile = {
  name: "Andy",
  avatar: "https://avatars.githubusercontent.com/u/35880890?v=4",
  "monthly-budget": 2500,
  "hours-per-day": 6,
  "days-per-week": 4,
  "vacation-per-year": 10
}

routes.get('/', (req, res) => res.render(views + 'index')) 
routes.get('/job', (req, res) => res.render(views + 'job')) 
routes.get('/job-edit', (req, res) => res.render(views + 'job-edit')) 
routes.get('/profile', (req, res) => res.render(views + 'profile', { profile })) 

module.exports = routes;