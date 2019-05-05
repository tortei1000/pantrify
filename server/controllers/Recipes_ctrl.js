module.exports = {
  get: (req, res) => {
    console.log(`get recipes fired`)
    const db = req.app.get('db') 
    const {id} = req.session.user
    console.log(req.session.user)

    db.display_recipes(id).then((recipe)=>{ //how can I get user_id here? so I can do my display.sql
      res.status(200).send(recipe)
    }).catch(err => console.log("error", err))
  },

  createRecipe : (req, res) => {
    const {session} = req
    console.log(session.user)
    const db = req.app.get('db')
    const { title, instructions} = req.body
    

    db.create_recipe([title, instructions]).then(() => {
    res.sendStatus(200)})
    console.log(`create recipe fired`)
    
  },

  delete: (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params

    db.delete_house(id).then(() => res.sendStatus(200))
    console.log(`delete recipe fired`)
      
  },
}