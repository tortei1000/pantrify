const express = require('express')
require('dotenv').config()
const app = express()
const massive = require('massive')
const session = require('express-session')
const Auth_ctrl = require('./controllers/Auth_ctrl')
const Recipes_ctrl = require('./controllers/Recipes_ctrl')
const Calendar_ctrl = require('./controllers/Calendar_ctrl')
const aws = require('aws-sdk');
const dateFns = require('date-fns')
const cron = require('node-cron')
const fs = require('fs')


const { PHONENUMBER, AUTHTOKEN, ACCOUNTSID, SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env

const client = require('twilio')(ACCOUNTSID, AUTHTOKEN);

app.use(express.json())

app.use(session({
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

app.get('/api/signs3', (req, res) => {  //start of S3
  aws.config = {
    region: 'us-west-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  };

  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };

    return res.send(returnData);
  });
});  // end of S3


cron.schedule('0 10 * * *', async function () { //cron starts for the sms twilo
  
  let todayDate = JSON.stringify(dateFns.format(new Date(), 'MM/DD/YYYY'))
  const db = app.get('db')
  let userArray = await db.get_users()
  
  userArray.map(async(user) => {
    const { id, phone } = user
    let queryFound = await db.sms_query([id, todayDate])
    if (queryFound) {
      
      client.messages
        .create({
          body: `Reminder:  You have chosen to cook ${queryFound[0].recipe} today`,
          from: PHONENUMBER,
          to: `+1${phone}`
        })
        .then(() => res.sendStatus(200));
    } else { res.sendStatus(500) }
  })
  
})




//end of twilio



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
app.get('/api/calendar/:title', Calendar_ctrl.search)
app.delete('/api/calendar/:id', Calendar_ctrl.delete)
app.get('/api/pantryCheck/', Calendar_ctrl.pantryCheck)