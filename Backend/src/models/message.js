const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    emitter: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.methods.toJSON = function () {
  const message = this;

  const messageObj = message.toObject();
  delete messageObj.receiver;
  delete messageObj.__v;
  delete messageObj.updatedAt;

  return messageObj;
};

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
