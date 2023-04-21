const handleCollector = async (client, message) => {
  const filter = (m) => m.from === message.from;
  const collector = client.createMessageCollector(
    message.from,
    filter,
    () => {},
    {
      max: 1,
      time: 1000 * 60, //1 minuto
    }
  );
  await client.sendText(message.from, "Digite Algo Para Eu Coletar");
  await collector.on("collect", (CollectedMessage) => {
    if (CollectedMessage) {
      console.log(CollectedMessage.content);
    }
  });
  await collector.on("end", async (allCollectedMessages) => {
    if (allCollectedMessages.size === 0) {
      await client.sendText(
        message.from,
        "Nenhuma Message Enviada Para A Coleta."
      );
      return;
    }
    await client.sendText(
      message.from,
      `Mensagens coletadas:${allCollectedMessages.map((eachMessage) => {
        return `\n ${eachMessage.content}`;
      })}`
    );
  });
};
module.exports = handleCollector;
