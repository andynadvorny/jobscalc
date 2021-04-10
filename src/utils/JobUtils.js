module.exports =  {
  remainingDays(job) {
    const totalDays = (job["total-hours"]/job["daily-hours"]).toFixed()
  
    const creationDate = new Date(job["created-at"])
    const dueDay = creationDate.getDate() + Number(totalDays)
    const dueDateInMs = creationDate.setDate(dueDay)
  
    const timeDiffInMs = dueDateInMs - Date.now()
    const timeInDays = Math.ceil(timeDiffInMs / (1000 * 60 * 60 * 24))
  
    return timeInDays
  }, 
  calculateCost(job, valueHour) {
    return valueHour * job["total-hours"]
  }
}