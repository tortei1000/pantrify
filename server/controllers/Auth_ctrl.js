const bcrypt = require('bcryptjs')

module.exports = {
  login: async (req, res) => {
    console.log(`login was fired`)
    const db = req.app.get('db')
    const { session } = req
    const { username } = req.body
    try {
      console.log(req.body.username)
      let user = await db.login({ username })
      session.user = user[0]
      const authenticated = bcrypt.compareSync(req.body.password, user[0].password)
      if (authenticated) {
        res.status(200).send({ authenticated, user_id: user[0].id})
      } else {
        throw new Error(401)
      }
    } catch (err) {
      console.log(err)
      res.sendStatus(401)
    }
  },
  register: async (req, res) => {
    console.log(`register user was fired`)
    const db = req.app.get('db')
    const { username, password } = req.body
    const { session } = req
    let usernameTaken = await db.check_username({ username })  //remember to pass username to sql we need to wrap it in an obejct
    usernameTaken = +usernameTaken[0].count
    if (usernameTaken !== 0) {
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
      login_id: user_id[0].user_id
    }
    res.sendStatus(200)
  },

  logout: async(req, res) => {
    console.log(`logout was fired`)
    req.session.destroy()
    res.sendStatus(200)
  }

}