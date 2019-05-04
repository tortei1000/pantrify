const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db')
    const { username, password } = req.body
    const { session } = req
    let nameTaken = await db.check_username({username})
    nameTaken = +nameTaken[0].count
    if(nameTaken !== 0) {
      return res.sendStatus(409)
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const user_id = await db.register_user({
      username, 
      hash
    })
    session.user = {
      username,
      hash,
      login_id: user_id[0].balance_id
    }
    res.sendStatus(200)
  },
  login: async (req, res) => {
    const db = req.app.get('db')
    const { session } = req
    const { loginUsername : username } = req.body
    try {
      let user = await db.login({username})
      session.user = user[0]
      const authenticated = bcrypt.compareSync(req.body.loginPassword, user[0].password)
      console.log(authenticated)
      console.log(bcrypt.hashSync(req.body.loginPassword, 10))
      console.log(user[0].password)
      if(authenticated){
        res.status(200).send({authenticated, user_id: user[0].login_id})
      } else {
        throw new Error(401)
      }
    } catch(err) {
      console.log(err)
      res.sendStatus(401)
    }
  },
  
  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  }
}