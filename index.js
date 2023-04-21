//BASE DE BOT UTILIZANDO O OPENWAAUTOMATE

const { create } = require("@open-wa/wa-automate");
const handleImageToSticker = require("./handles/handleImageToSticker");
const handleCollector = require("./handles/handleCollector");
const handleNewPost = require("./handles/handleNewPost");

const App = async (client) => {
  await client.onAnyMessage(async (message) => {
    if (message && message.text && message.text.includes("!figurinhas")) {
      try {
        await handleImageToSticker(client, message).catch();
      } catch {
        await client.sendText(
          message.from,
          "Não Foram Encontradas As Images Para Converter Em Figurinhas, Marque Uma Imagem Ou Envie Uma Imagem Com A Legenda !figurinhas"
        );
      }
    }
    if (message && message.text && message.text.includes("!enquete")) {
        await handleNewPost(client, message)
    }

    if (message && message.text && message.text.includes("!colete")) {
       await handleCollector(client, message)
    }
  });
};

create().then((client) => App(client));
