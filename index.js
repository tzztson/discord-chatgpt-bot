require('dotenv').config();
const Eris = require("eris");
const { Configuration, OpenAIApi } = require("openai");
const { Client, GatewayIntentBits, Partials } = require("discord.js");


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const bot = new Eris(process.env.DISCORD_BOT_TOKEN, {
  intents: [
    "guildMessages"
  ]
});

async function runCompletion(message) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 200,
  });
  return completion.data.choices[0].text;
}

bot.on("ready", () => {
  console.log("Bot is connected and ready!");
});

bot.on("error", (err) => {
  console.error(err);
});

bot.on("messageCreate", (msg) => {
  if (msg.content.startsWith("~")) {
    runCompletion(msg.content.substring(1)).then(result => bot.createMessage(msg.channel.id, result));
  }
});

bot.connect();

// console.log("Hello")

// const prefix = "/";

// const client = new Client({
//   'intents': [
//     GatewayIntentBits.DirectMessages,
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildBans,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.MessageContent,
//   ],
//   'partials': [Partials.Channel],
// });

// client.on('ready', () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on('messageCreate', msg => {
//   if (!msg.content.startsWith(prefix)) return;

//   if (msg.content === "/start") {
//     msg.reply("I'm discord bot");
//   }
// })

// client.login("MTA3NjkyMjY0NzU2MjE3NDYxNw.GfvQTx.EX09u4598f3r0Gk267rLVkDDt8veS7_4duo_Uw");