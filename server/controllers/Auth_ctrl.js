const bcrypt = require('bcryptjs')

module.exports = {
  register : async (req, res)=> {
    const db = req.app.get('db')
    const {username, password, phone} = req.body

    let result = await db.get_user(username)
    let existingUser = result[0]

    if(existingUser){
      return res.status(409).send(`username taken`)
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    let registeredUser = await db.register_user(username, hash, phone) 
    let user = registeredUser[0]

    delete user.hash
    req.session.user = user
    res.status(201).send(req.session.user)
  },

  login: async (req, res) => { //does the params passed in req.body have to match their names in the ctrl 
    const db = req.app.get('db')
    const {loginUsername: username, loginPassword:password} = req.body

    foundUser = await db.get_user(username)
    user = foundUser[0]
    
    if(!user){
      return res.status(401).send(`username or password incorrect`)
    }
   
    isAuthenticated = bcrypt.compareSync(password, user.password) 
    if(!isAuthenticated){
      return res.status(401).send(`username or password incorrect`)
    } 

    delete user.hash
    req.session.user = user
    res.send(req.session.user)
      
  },
  logout : (req, res) =>{ //not working
    req.session.destroy()
    console.log(`logout fired`)
    res.sendStatus(200)
  },
  getUsers: (req, res) => {
    console.log(`getUsers was fired`)
    if(!req.session.user){res.sendStatus(403)}
    else{
      res.status(200).send(req.session.user)
    } 
  }
}