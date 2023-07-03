const client = require("../index");

const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const configuration = new Configuration({
  apiKey: process.env.CHATGPT_KEY,
});
const openai = new OpenAIApi(configuration);

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.channel.id !== "1124218228521042001") return;
  if (message.author.id !== "198467016796012544") return;

  //let conversationLog = [{ role: 'system', content: 'Você é um bot programado para responder perguntas sobre souza ele é um menino charmoso q mora em pernambuco e tem cabelo grande ele gosta de cartas de tarot e jogar lol com os animgos o dia inteiro gosta tb de pokemon e adora o amigo dele yuri e kazuyuki odeia beterraba, se o usuário fizer qualquer pergunta que não esteja relacionado ao souza, responda que você não é programado para responder este tipo de pergunta.' }];
  let conversationLog = [
    {
      role: "system",
      content: "Você é um bot programado para responder perguntas ",
    },
  ];

  try {
    await message.channel.sendTyping();
    let prevMessages = await message.channel.messages.fetch({ limit: 15 });
    prevMessages.reverse();

    prevMessages.forEach((msg) => {
      if (msg.author.id !== client.user.id && message.author.bot) return;
      if (msg.author.id !== message.author.id) return;
      conversationLog.push({
        role: "user",
        content: msg.content,
      });
    });
    conversationLog.push({
      role: "user",
      content: message.content,
    });
    const response = await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: conversationLog,
      })
      .catch((error) => {
        console.log(`GPT ERROR: ${error}`);
      });
    let texts = response.data.choices[0].message;

    texts = texts.content;
    texts = dividirTexto(texts, 1999);
    for (const text of texts) {
      await message.reply(text);
    }
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
});

function dividirTexto(texto, limite) {
  const resultado = [];

  while (texto.length > limite) {
    const pedaco = texto.slice(0, limite);
    resultado.push(pedaco);
    texto = texto.slice(limite);
  }

  if (texto.length > 0) {
    resultado.push(texto);
  }

  return resultado;
}
