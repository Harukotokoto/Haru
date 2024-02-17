import {
  APIEmbed,
  APIEmbedFooter,
  ChannelType,
  Colors,
  Guild,
  TextChannel,
} from 'discord.js';
import { client } from '../../index';

const footer = (): APIEmbedFooter => {
  const user = client.users.cache.get('1004365048887660655');
  return {
    text: `Produced by ${user?.displayName}`,
    icon_url: user?.avatarURL() as string,
  };
};

export { footer };
