module.exports = {
  get: (req, res) => {
    console.log(`get recipes fired`)
    const db = req.app.get('db')
    let { id } = req.session.user
    id = String(id)
    console.log(id, 'here is id')
    if (req.query.title) {
      let searchTerm = `%${req.query.title}%`
      console.log('here is req', searchTerm)
      db.search([id, searchTerm]).then((recipe) => {
        res.status(200).send(recipe)
      })
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

  createRecipe: (req, res) => {
    console.log(`create recipe was fired`)
    const { session } = req
    console.log(session.user)
    const db = req.app.get('db')
    const { title, instructions, image, ingredients } = req.body
    const { id } = req.session.user


    db.create_recipe([id, title, instructions, image]).then((id_array) => {
      console.log(`please look it here `, id)
      ingredients.forEach(ingredient => {
        const { name, quantity, unit } = ingredient
        const myId = id_array[0].id
        db.add_ingredients([myId, name, quantity, unit])
      })
      const myId = id_array[0].id
      db.ing_count_updater(myId)
      res.sendStatus(200)
    })
    console.log(`create recipe fired`)

  },

  delete: (req, res) => {
    console.log(`delete recipe was fired`)
    
    const db = req.app.get('db')
    console.log("look at me", req.params)
    const { id } = req.params
    const { id: user_id } = req.session.user
    
    db.delete_recipe([id, user_id]).then((recipe) => {
      console.log(recipe) 
      res.status(200).send(recipe)})


  },

  update: (req, res) => {
    console.log(`update recipe fired`)
    const db = req.app.get('db')
    const { id } = req.params;
    console.log('look at memmmmmm', id)
    const { title, instructions, ingredients } = req.body

    db.delete_ingredients(id).then(() => {
      db.update_recipe([title, instructions, id]).then(() => {
        ingredients.forEach(ingredient => {
          const { name, quantity, unit } = ingredient
          console.log("this here is the other id", id)
          db.add_ingredients([id, name, quantity, unit])
        })

      })
      db.ing_count_updater(id)
      res.sendStatus(200)
    })

  },

  search: (req, res) => {
    console.log(`search was fired`)
    const db = req.app.get('db')

  },

  getShopIngredients: (req, res) => {
    console.log('get shop ingredients fired')
    console.log(req.session.user)
    const db = req.app.get('db')
    const { id } = req.session.user
    db.get_shopping_list(id).then((ingredient) => {
      res.status(200).send(ingredient)
    })
  },

  sendToList: (req, res) => {
    console.log('send to list fired')
    const db = req.app.get('db')
    const { id } = req.params
    db.add_to_list(id).then(() => {
      res.sendStatus(200)
    })
  },

  removeFromList: (req, res) => {
    console.log('remove from list was fired')
    const db = req.app.get('db')
    const { id } = req.params
    db.remove_from_list(id).then(() => {
      res.sendStatus(200)
    })
  },

  getPantry: (req, res) => {
    console.log(`get pantry was fired`)
    const db = req.app.get('db')
    const { id } = req.session.user
    db.get_pantry(id).then((pantry) => {
      res.status(200).send(pantry)
    })
  },

  addToPantry: (req, res) => {
    console.log(`add to pantry was fired`)
    const db = req.app.get('db')
    const { id } = req.params
    db.add_to_pantry(id).then(() =>
      res.sendStatus(200))
  },

  removeFromPantry: (req, res) => {
    console.log('remove from list was fired')
    const db = req.app.get('db')
    const { id } = req.params
    db.remove_from_pantry(id).then(() => {
      res.sendStatus(200)
    })
  }

}