module.exports = {
  get: (req, res) => {
    console.log(`get recipes fired`)
    const db = req.app.get('db')

    db.display_recipes().then((recipe)=>{
      res.status(200).send(recipe)
    }).catch(err => console.log("error", err))
  },

  createRecipe : (req, res) => {
    console.log(req.session.user)
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