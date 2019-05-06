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
      db.display_recipes(id).then((recipe) => { //how can I get user_id here? so I can do my display.sql
        res.status(200).send(recipe)
      }).catch(err => console.log("error", err))
    }
  },

  createRecipe: (req, res) => {  // create, delete and update not getting fired upon button press
    console.log(`create recipe was fired`)
    const { session } = req
    console.log(session.user)
    const db = req.app.get('db')
    const { title, instructions } = req.body


    db.create_recipe([title, instructions]).then(() => {
      res.sendStatus(200)
    })
    console.log(`create recipe fired`)

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