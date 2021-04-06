let data = {
  name: "Andy",
  avatar: "https://github.com/andynadvorny.png",
  "monthly-budget": 3000,
  "hours-per-day": 6,
  "days-per-week": 4,
  "vacation-per-year": 10,
  "hour-value": 75
}

module.exports = {
  get(){
    return data;
  },
  update(newData){
    data = newData;
  }
}