const router = require('express').Router();

const auth = require('../middleware/auth');
const pushNotification = require('../utility/pushNotifications');
const Message = require('../models/message');

//send
router.post('', auth, async (req, res) => {
  try {
    const message = new Message({
      emitter: req.user.id,
      message: req.body.message,
      receiver: req.body.userId,
    });
    pushNotification(req.user.name, req.body.targetToken, req.body.message);
    await message.save();
    res.send('');
  } catch (error) {
    res.status(400).send('');
  }
});

//get all messages
router.get('', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      receiver: req.user.id,
    })
      .populate('emitter', ['name'])
      .sort({ createdAt: -1 });
    res.send({ messages });
  } catch (error) {
    res.status(400).send('');
  }
});

//delete
router.delete('/:id', auth, async (req, res) => {
  try {
    await Message.findOneAndDelete({
      _id: req.params.id,
      receiver: req.user.id,
    });
    res.send('');
  } catch (error) {
    res.status(400).send('');
  }
});

module.exports = router;
