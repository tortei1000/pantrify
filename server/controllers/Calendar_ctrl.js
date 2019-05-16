module.exports = {
  newEntry: (req, res) => {
    console.log(`new entry was fired`)
    const { id } = req.session.user
    const { meal_day, recipe, recipe_id } = req.body
    const db = req.app.get('db')

    db.new_calendar_entry([id, meal_day, recipe, recipe_id]).then((result) => {
      res.status(200).send(result[0])
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
    console.log(`here is the req. pleessssssss`, req.params)
    const db = req.app.get('db')
    const { title } = req.params
    db.search_calendar(title).then((recipe) => {
      console.log(recipe)
      res.status(200).send(recipe)
    })
  },
  delete: (req, res) => {
    console.log(`calendar delete fired`)
    const { id } = req.params
    const db = req.app.get('db')

    db.calendar_delete(id).then((meals) => {
      res.status(200).send(meals)
    })
  },



  pantryCheck: async (req, res) => {

    const { id } = req.session.user
    const db = req.app.get('db')
    let itemsInPantry = await db.items_in_pantry(id)
    console.log(itemsInPantry)

    itemsInPantry.map((item) => {
      db.ing_count_updater(item.id)
    })

    Promise.all(itemsInPantry.map((item) => {
      return db.ingredient_count(item.id)
    })).then((arr) => {

      res.status(200).send(itemsInPantry.filter((recipe, index) => {
        console.log(arr[index][0].count, recipe)
        return +arr[index][0].count === recipe.ing_count

      }))
    })





  }
}
