const { Client, GatewayIntentBits, Events } = require("discord.js");
// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});
// When the client is ready, run this code (only once)
client.once(Events.ClientReady, c => {
  console.log(`🤖 Logged in as ${c.user.tag}`);
});
// Listen for message creation events
client.on(Events.MessageCreate, message => {
  // Ignore messages from bots (including ourselves)
  if (message.author.bot) return;
  
  // Handle commands
  if (message.content.startsWith("$hello")) {
    message.channel.send("Hi from Lunex!");
  }
  
  if (message.content.startsWith("$ping")) {
    message.channel.send("Pong!");
  }
});
// Login to Discord with your client's token
const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error("❌ No DISCORD_TOKEN provided in environment variables!");
  process.exit(1);
}
client.login(token);