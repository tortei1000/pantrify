module.exports = {
  newEntry : (req, res) => {
    console.log(`new entry was fired`)
    const {id} = req.session.user
    const {day, value} = req.body
    const db = req.app.get('db')
    
    db.new_calendar_entry([id, day, value.title]).then(()=>{
      res.sendStatus(200)
    })
  },

  getCalendarMeals : (req, res) => {
    console.log(`calendar meals was fired`)
    const {id} = req.session.user
    const db = req.app.get('db')

    db.get_calendar_meals(id).then((meals)=>{
      res.status(200).send(meals)
    })
  }
}