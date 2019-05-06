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

  getIngredients: (req,res) => {
    console.log(`ingredients fired`)
    const db = req.app.get('db')
    const {id} = req.params
    db.get_ingredients([id]).then((ingredient)=> {
      res.status(200).send(ingredient)
    }).catch(err => console.log('error', err))
  },

  createRecipe: (req, res) => {  // create, delete and update not getting fired upon button press
    console.log(`create recipe was fired`)
    const { session } = req
    console.log(session.user)
    const db = req.app.get('db')
    const {title, instructions, ingredients} = req.body
    const {id} = req.session.user


    db.create_recipe([id, title, instructions]).then((id_array) => {
      console.log(ingredients)
      ingredients.forEach(ingredient => {
        const {name, quantity, unit} = ingredient
        const myId = id_array[0].id
        db.add_ingredients([myId, name, quantity, unit])
      })
      res.sendStatus(200)
    })
    console.log(`create recipe fired`)

  },

  delete: (req, res) => {
    console.log(`delete recipe was fired`)
    const db = req.app.get('db')
    console.log("look at me", req.params)
    const { id } = req.params
    const {id:user_id} = req.session.user
    db.delete_recipe([id, user_id]).then((recipe) => res.status(200).send(recipe))
    

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