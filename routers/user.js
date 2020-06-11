const { Router } = require('express');
const User = require("../models").user;
const bcrypt = require('bcrypt');

const router = new Router();

router.get("/", async (request, response) => {
    const users = await User.findAll()
    response.send(users);
})

router.post("/", async (req, res, next) => {
    try {
      const { email, password, fullName } = req.body;
      if (!email || !password || !fullName) {
        res.status(400).send("Missing parameters");
      } else {
          // hashing password
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
          email,
          password: hashedPassword,
          fullName,
        });
        res.json(newUser);
      }
    } catch (e) {
      next(e);
    }
  });

module.exports = router;