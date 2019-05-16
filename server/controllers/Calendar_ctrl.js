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

    const { id } = req.session.user  //I know how many ingredients in a given recipe, I also know if the recipe is all in pantry
    const db = req.app.get('db')  //by calculating the difference between items in pantry to all ingredients in recipe
    let itemsInPantry = await db.items_in_pantry(id) //I have recipe id in items in pantry but not in all ingredients
    console.log(itemsInPantry) //
    let allIngredientsInRecipe = []

    itemsInPantry.map(async (item, index) => {
      let ingredientCount = await db.all_ingredients_in_recipe(item.id)
      let ingredientRequired = await db.require_ingredients(item.id)
      if (ingredientCount[index] === ingredientRequired[index]) {
        return allIngredientsInRecipe.push(true)
      }
      console.log(allIngredientsInRecipe)
    })
      // 
      // let itemsNotInPantry = await db.items_not_in_pantry(id)


    
      res.send(allIngredientsInRecipe)
    
  }
}