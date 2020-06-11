const { Router } = require('express')
const { toJWT, toData } = require('../auth/jwt')

const router = new Router()

router.post('/login', (req, res, next) => {
  try {
    const user = req.body
    if (!user) {
        res.status(400).send({
            message: "Please supply a valid email and password",
          });
    } else {
        res.send({
        jwt: toJWT({ userId: 1 }),
  });
    }
  } catch(e){
      next(e)
  }
})

module.exports = router