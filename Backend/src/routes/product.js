const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const getImages = require('../utility/getImages');
const upload = require('../middleware/upload');
const Product = require('../models/product');
const User = require('../models/user');

router.post('', auth, upload.array('images', 3), async (req, res) => {
  const body = JSON.parse(req.body.product);
  try {
    const images = await getImages(req.files);
    const product = new Product({
      ...body,
      owner: req.user.id,
      images,
    });
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error.error);
  }
});

router.get('', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.send({ products });
  } catch (error) {
    res.status(400).send();
  }
});

//my products
router.get('/me', auth, async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });
    res.send({ products });
  } catch (error) {
    res.status(400).send('');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Product.findById(req.params.id).populate('owner', [
      'name',
      'avatar',
      'expoPushToken',
    ]);
    const count = await Product.countDocuments({
      owner: data.owner.id,
    });
    //no deja pegar propiedades extra
    const product = data.toObject();
    product.owner.count = count;
    res.send({ product });
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
