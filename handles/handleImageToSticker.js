const { decryptMedia } = require("@open-wa/wa-automate");

const handleImageToSticker = async (client, message) => {
  let boolean = false;
  if (!message.mimetype) {
    if (message.quotedMsg && message.quotedMsg.mimetype) {
      boolean = true;
    }
  }
  const mediaData = boolean
    ? await decryptMedia(message.quotedMsg)
    : await decryptMedia(message);
  await client.sendImageAsSticker(message.from, mediaData);
};
module.exports = handleImageToSticker;
