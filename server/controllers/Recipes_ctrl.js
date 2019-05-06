module.exports = {
  get: (req, res) => {
    console.log(`get recipes fired`)
    const db = req.app.get('db')
    const { id } = req.session.user
    if (req.query.title) {
      console.log("search was fired")
      let { title } = req.query
      res.send(recipes.filter(recipe => recipe.title.includes(title)))
    } else {
      db.display_recipes([id]).then((recipe) => {
        res.status(200).send(recipe)
      }).catch(err => console.log("error", err))
    }
  },

  getIngredients: (req, res) => {
    console.log(`ingredients fired`)
    const db = req.app.get('db')
    const { id } = req.params
    db.get_ingredients([id]).then((ingredient) => {
      res.status(200).send(ingredient)
    }).catch(err => console.log('error', err))
  },

  createRecipe: (req, res) => {  // create, delete and update not getting fired upon button press
    console.log(`create recipe was fired`)
    console.log(req.body)
    const db = req.app.get('db')
    const { user_id, title, instructions } = req.body


    db.create_recipe([user_id, title, instructions]).then(() => {
      res.sendStatus(200)
    })
    

  },

  addIngredients: (req, res) => {
    console.log(`add ingredients was fired`)
    const db = req.app.get('db')
    const {recipe_id, name, quantity, unit} = req.body

    db.add_ingredients([recipe_id, name, quantity, unit]).then(()=>{
      res.sendStatus(200)
    })
  },

  delete: (req, res) => {
    console.log(`delete recipe was fired`)
    const db = req.app.get('db')
    const { id } = req.params

    db.delete_house(id).then(() => res.sendStatus(200))
    console.log(`delete recipe fired`)

  },

  update: (req, res) => {
    console.log(`update recipe fired`)
    const db = req.app.get('db')
    const { id } = req.params;
    let userData = req.body;
    userData.id = id
    db.update_recipe([title, instructions]).then(() => {
      res.sendStatus(200)
    })
  },

  search: (req, res) => {
    console.log(`search was fired`)
    const db = req.app.get('db')

  }
}