module.exports = {
  newEntry: (req, res) => {
    console.log(`new entry was fired`, req.body)
    const { id } = req.session.user
    const { meal_day, recipe } = req.body
    const db = req.app.get('db')

    db.new_calendar_entry([id, meal_day, recipe]).then(() => {
      res.sendStatus(200)
    })
  },

  getCalendarMeals: (req, res) => {
    console.log(`calendar meals was fired`)
    const { id } = req.session.user
    const db = req.app.get('db')

    db.get_calendar_meals(id).then((meals) => {
      res.status(200).send(meals)
    })
  },
  search: (req, res) => {
    console.log(`search calendar is fired`)
    console.log(`here is the req. pleessssssss`,req.params)
    const db  = req.app.get('db')
    const { title } = req.params
    db.search_calendar(title).then((recipe) => {
      console.log(recipe)
      res.status(200).send(recipe)
    })
  },
  delete : (req, res) => {
    console.log(`calendar delete fired`)
    const {id} = req.params
    const db = req.app.get('db')

    db.calendar_delete(id).then((meals)=>{
      res.status(200).send(meals)
    })
  },

}