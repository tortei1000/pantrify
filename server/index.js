const express = require('express')
require('dotenv').config()
const app = express()
const massive = require('massive')
const session = require('express-session')
const Auth_ctrl = require('./controllers/Auth_ctrl')
const Recipes_ctrl = require('./controllers/Recipes_ctrl')
const Calendar_ctrl = require('./controllers/Calendar_ctrl')

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

app.use(express.json())

app.use(session({  //how can I make sessions last through a refresh
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

massive(CONNECTION_STRING).then((database) => {
  app.set('db', database)
  console.log(`1- db is connected`)
  app.listen(SERVER_PORT, () => {
    console.log(`2-server is connected on ${SERVER_PORT}`)
  })
})

app.post('/auth/login', Auth_ctrl.login)
app.post('/auth/register', Auth_ctrl.register)
app.get('/auth/logout', Auth_ctrl.logout)
app.get('/auth/users', Auth_ctrl.getUsers)
app.get('/api/recipes', Recipes_ctrl.get)
app.get('/api/ingredients/:id', Recipes_ctrl.getIngredients)
app.post('/api/recipes', Recipes_ctrl.createRecipe)
app.delete('/api/recipes/:id', Recipes_ctrl.delete)
app.put('/api/recipes/:id', Recipes_ctrl.update)
app.get('/api/ingredients', Recipes_ctrl.getShopIngredients)
app.put('/api/ingredients/:id', Recipes_ctrl.sendToList)
app.put('/api/shoppinglist/:id', Recipes_ctrl.removeFromList)
app.get('/api/pantry', Recipes_ctrl.getPantry)
app.put('/api/addtopantry/:id', Recipes_ctrl.addToPantry)
app.put('/api/removepantry/:id', Recipes_ctrl.removeFromPantry)
app.post('/api/calendar', Calendar_ctrl.newEntry)
app.get('/api/calendar', Calendar_ctrl.getCalendarMeals)