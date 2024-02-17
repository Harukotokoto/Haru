import { Command } from '../../lib/modules/Command';
import { Colors } from 'discord.js';
import { footer } from '../../lib/utils/Embed';

export default new Command({
  name: 'ping',
  description: 'Botの応答速度を表示します',
  ephemeral: false,
  execute: async ({ client, interaction }) => {
    const response =
      Date.now() - (await interaction.fetchReply()).createdTimestamp;

    await interaction.followUp({
      embeds: [
        {
          title: 'Pong!',
          description:
            `**WebSocket:** \`${client.ws.ping}\`ms\n` +
            `**Latency:** \`${response}\`ms`,
          color: Colors.Green,
          footer: footer(),
        },
      ],
    });
  },
});
