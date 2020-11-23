const sharp = require('sharp');

module.exports = async files => {
  try {
    let data = [];
    for (var file of files) {
      let buffer = sharp(file.buffer)
        .resize({
          width: 400,
          height: 400,
        })
        .jpeg()
        .toBuffer();
      data.push(buffer);
    }
    const images = await Promise.all(data);
    return images;
  } catch (error) {
    return null;
  }
};
