const { Router } = require('express');
const Image = require("../models").image;

const router = new Router();

router.get("/", (req, res, next) => {
    // limit of images on one page
    const limit = Math.min(req.query.limit || 25, 500);
    // how many images are skipped
    const offset = req.query.offset || 0;
  
    Image.findAndCountAll({ limit, offset })
      .then((result) => res.send({ images: result.rows, total: result.count }))
      .catch((error) => next(error));
  });

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