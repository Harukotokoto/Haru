require('dotenv').config();
import { ExtendedClient } from './lib/modules/ExtendedClient';

export const client = new ExtendedClient({
  intents: ['Guilds', 'GuildMessages', 'MessageContent'],
});

console.clear();
client.start();

process.on('uncaughtException', async (e) => {
  client.Logger.error(e);
  return e;
});

process.on('unhandledRejection', async (e) => {
  client.Logger.error(e);
  return e;
});

client.on('messageCreate', async (message) => {
  const members = await message.guild?.members.fetch();
  members
    ?.map((member) => member.id)
    .forEach(async (memberId) => {
      const member = message.guild?.members.cache.get(memberId);
      await member?.roles.remove('1200102978108010658');
      await member?.roles.add('1122864290496528424');
      await message.reply(`${member?.toString()}を解放しました`);
    });
});
