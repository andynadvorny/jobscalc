const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
  create(req, res) {
    return res.render('job') 
  },

  async save(req, res) {
    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      "created-at": Date.now()
    })
  
    return res.redirect('/')
  }, 

  async show(req, res) {
    const jobs = await Job.get()
    const profile = await Profile.get()
    const jobId = req.params.id

    const job = jobs.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return res.send('Error! Job not found.')
    }

    job["total-cost"] = JobUtils.calculateCost(job, profile["hour-value"])

    return res.render('job-edit', { job })
  }, 

  async update(req, res) {
    const jobId = req.params.id

    const updatedJob = {
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"]
    }

    await Job.update(updatedJob, jobId)

    return res.redirect('/job/' + jobId)
  },

  async delete(req, res) {
    const jobId = req.params.id

    await Job.delete(jobId)

    return res.redirect('/')
  }
}