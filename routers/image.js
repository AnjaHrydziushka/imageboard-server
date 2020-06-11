const { Router } = require('express');
const Image = require("../models").image;
const {toData} = require('../auth/jwt');

const router = new Router();

// get all images
router.get("/", async (req, res, next) => {
    try {
      const allImages = await Image.findAll();
      res.json(allImages);
    } catch (e) {
      next(e);
    }
  });

  // get 1 image
router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const oneImage = await Image.findByPk(id)

        if(!oneImage) {
            res.status(404).send("Image not found")
        } else {
            res.send(oneImage)
        }
    } catch(e){
        next(e)
    }
})

// protecting images
router.get("/messy", async (req, res, next) => {
    const auth = req.headers.authorization && req.headers.authorization.split(" ");
    if (auth && auth[0] === "Bearer" && auth[1]) {
      try {
        const data = toData(auth[1]);
        console.log(data)
      } catch (e) {
        res.status(400).send("Invalid JWT token");
      }
      const allImages = await Image.findAll();
      res.json(allImages);
    } else {
      res.status(401).send({
        message: "Please supply some valid credentials",
      });
    }
  });


// post an image
router.post("/", async (req, res, next) => {
    try {
        console.log(req.body)
        const {title, url} = req.body
        const newImage = await Image.create({title, url})
        res.send(newImage)
    } catch (e) {
        next (e)
    }
})

module.exports = router;