const express = require('express');
const routes = express.Router()

const views = __dirname + "/views/"

const Profile = {
  data: {
    name: "Andy",
    avatar: "https://github.com/andynadvorny.png",
    "monthly-budget": 3000,
    "hours-per-day": 6,
    "days-per-week": 4,
    "vacation-per-year": 10,
    "hour-value": 75
  },
  controllers: {
    index(req, res) {
      return res.render(views + 'profile', { profile: Profile.data })
    },
    update(req, res) {
      const data = req.body

      const workWeeksPerMonth = (52 - data["vacation-per-year"]) / 12 
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
      const workHoursPerMonth = workWeeksPerMonth * weekTotalHours

      data["hour-value"] = data["monthly-budget"] / workHoursPerMonth
      
      Profile.data = data

      return res.redirect('/profile')
    }
  }
} 

const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 60,
      "created-at": Date.now()
    },
    {
      id: 2,
      name: "OneTwo Project",
      "daily-hours": 3,
      "total-hours": 47,
      "created-at": Date.now()
    }
  ],
  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'
    
        return {
          ...job,
          "remaining-days": remaining,
          "status": status,
          "total-cost": Job.services.calculateCost(job, Profile.data["hour-value"])
        }
      }) 
    
      return res.render(views + 'index', { jobs: updatedJobs })
    },
    create(req, res) {
      return res.render(views + 'job') 
    },
    save(req, res) {

        const lastId = Job.data[Job.data.length - 1]?.id || 0;  
      
        Job.data.push({
          id: lastId + 1,
          name: req.body.name,
          "daily-hours": req.body["daily-hours"],
          "total-hours": req.body["total-hours"],
          "created-at": Date.now()
        })
      
        return res.redirect('/')
    }, 
    show(req, res) {
      const jobId = req.params.id

      const job = Job.data.find(job => Number(job.id) === Number(jobId))

      if (!job) {
        return res.send('Error! Job not found.')
      }

      job["total-cost"] = Job.services.calculateCost(job, Profile.data["hour-value"])

      return res.render(views + 'job-edit', { job })
    }, 
    update(req, res) {
      const jobId = req.params.id

      const job = Job.data.find(job => Number(job.id) === Number(jobId))

      if (!job) {
        return res.send('Error! Job not found.')
      }

      const updatedJob = {
        ...job,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"]
      }

      Job.data = Job.data.map(job => {
        if(Number(job.id) === Number(jobId)) {
          job = updatedJob
        }

        return job
      }) 

      return res.redirect('/job/' + jobId)
    },
    delete(req, res) {
      const jobId = req.params.id

      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

      return res.redirect('/')
    }
  },
  services: {
    remainingDays(job) {
      const totalDays = (job["total-hours"]/job["daily-hours"]).toFixed()
    
      const creationDate = new Date(job["created-at"])
      const dueDay = creationDate.getDate() + Number(totalDays)
      const dueDateInMs = creationDate.setDate(dueDay)
    
      const timeDiffInMs = dueDateInMs - Date.now()
      const timeInDays = Math.floor(timeDiffInMs / (1000 * 60 * 60 * 24))
    
      return timeInDays
    }, 
    calculateCost(job, valueHour) {
      return valueHour * job["total-hours"]
    }
  }
}

routes.get('/', Job.controllers.index) 
routes.get('/job', Job.controllers.create) 
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show) 
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index) 
routes.post('/profile', Profile.controllers.update) 

module.exports = routes;