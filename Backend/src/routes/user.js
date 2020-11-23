const express = require('express');
const router = express.Router();
const sharp = require('sharp');

const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const User = require('../models/user');
const sendPushNotifications = require('../utility/pushNotifications');

//get current user
router.get('/me', auth, async (req, res) => {
  res.send({ user: req.user });
});

router.post('', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

//
router.patch('/location', auth, async (req, res) => {
  try {
    req.user.coordinates = req.body;
    await req.user.save();
    res.send({ user: req.user });
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

//update user
router.patch('/me', auth, upload.single('avatar'), async (req, res) => {
  try {
    const buffer = await sharp(req.file.buffer)
      .resize({
        width: 150,
        height: 150,
      })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.status(200).send({ user: req.user });
  } catch (error) {
    res.status(400).send();
  }
});

router.put('/expoToken', auth, async (req, res) => {
  try {
    req.user.expoPushToken = req.body.token;
    await req.user.save();
    res.send({ user: req.user });
  } catch (error) {
    res.status(400).send();
  }
});

router.post('/expo', auth, async (req, res) => {
  sendPushNotifications(req.user.expoPushToken, 'Hola mi negro');
  res.send('');
});

module.exports = router;
