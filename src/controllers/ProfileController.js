const Profile = require('../model/Profile')

module.exports = {
  async index(req, res) {
    return res.render('profile', { profile: await Profile.get() })
  },
  async update(req, res) {
    const data = req.body

    const workWeeksPerMonth = (52 - data["vacation-per-year"]) / 12 
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
    const workHoursPerMonth = workWeeksPerMonth * weekTotalHours

    data["hour-value"] = data["monthly-budget"] / workHoursPerMonth
    
    await Profile.update(data) 

    return res.redirect('/profile')
  }
}