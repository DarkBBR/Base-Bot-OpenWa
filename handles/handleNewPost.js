// comando feito só para GRUPO
const handleNewPost = async (client, message) => {
  let count = 0;
  if (message.chat.groupMetaData) {
    await client.sendText(message.from, "Este comando só funciona em um grupo");
    return;
  }
  const filter = (m) => m.sender.id === message.sender.id;
  const collector = client.createMessageCollector(message.from, filter, {
    time: 1000 * 60, // 1 minuto
  });

  await client.sendText(message.from, "Diga o título da Enquete");
  collector.on("collect", async (m) => {
    if (m) {
      count++;
    }
    if (count === 1) {
      await client.sendText(
        message.from,
        "Agora me diga as opções da equete. Quando acabar, digite 'Fim' para finalizar a enquete."
      );
    }
    if (m.text === "fim" || m.text === "Fim" || m.text === "FIM") {
      collector.stop();
    }
  });
  collector.on("end", async (allM) => {
    if (allM.size === 0) {
      await client.sendText(
        message.from,
        "Nenhuma mensagem coletada para a enquete. ENCERRANDO ENQUETE"
      );
    }
    const messages = allM.map((each) => each.content)
    const title = messages.shift()
    messages.pop()
    await client.sendPoll(message.from, title, messages)
  });

  //client.sendPost(message.from, "Titulo Da Enquete", ["opção1", "opção2"])
};
module.exports = handleNewPost;
