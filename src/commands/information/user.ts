import { Command } from '../../lib/modules/Command';
import { ApplicationCommandOptionType, Colors } from 'discord.js';
import { footer } from '../../lib/utils/Embed';
import moment from 'moment';

export default new Command({
  name: 'user',
  description: 'ユーザーの情報を表示します',
  options: [
    {
      name: 'user',
      description: '情報を表示するユーザー',
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  ephemeral: false,
  execute: async ({ client, interaction }) => {
    if (!interaction.guild) return;
    const user = interaction.options.getUser('user') || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      interaction.followUp({
        embeds: [
          {
            author: {
              name: user.tag,
              icon_url: user.displayAvatarURL({ size: 4096 }),
            },
            description:
              `**ユーザー名**: ${user.username}\n` +
              `**表示名**: ${user.displayName}\n` +
              `**ユーザーID**: ${user.id}\n` +
              `**作成日**: <t:${user.createdTimestamp / 1000}>\n`,
            color: Colors.Blue,
            footer: footer(),
          },
        ],
      });
    } else {
      interaction.followUp({
        embeds: [
          {
            author: {
              name: user.tag,
              icon_url: user.displayAvatarURL({ size: 4096 }),
            },
            description:
              `**ユーザー名**: ${member.user.username}\n` +
              `**表示名**: ${member.displayName !== user.displayName ? `${member.displayName}(${user.displayName})` : user.displayName}\n` +
              `**ユーザーID**: ${user.id}\n` +
              `**作成日**: <t:${member.user.createdTimestamp / 1000}>\n` +
              `**ユーザーの所持しているロール**: ${
                member.roles.cache
                  .filter((role) => role.id !== interaction.guild?.id)
                  .map((role) => `<@&${role.id}>`)
                  .join(' ') || 'このユーザーはロールを所持していません'
              }`,
            color: Colors.Blue,
            footer: footer(),
          },
        ],
      });
    }
  },
});
