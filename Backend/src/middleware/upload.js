const multer = require('multer');

module.exports = multer({
  limits: {
    fieldSize: 1000000,
  },
});
