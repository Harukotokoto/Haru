import { Command } from '../../lib/modules/Command';
import { Colors } from 'discord.js';
import { footer } from '../../lib/utils/Embed';
import { title } from 'process';

export default new Command({
  name: 'ping',
  description: 'Botの応答速度を表示します',
  ephemeral: false,
  execute: async ({ client, interaction }) => {
    await interaction.followUp({
      embeds: [
        {
          title: 'Pinging...',
          color: Colors.Blue,
          footer: footer(),
        },
      ],
    });

    const message = await interaction.fetchReply();
    const response = message.createdTimestamp - interaction.createdTimestamp;

    await interaction.editReply({
      embeds: [
        {
          title: 'Pong!',
          description:
            `**WebSocket:** \`${client.ws.ping}\`ms\n` +
            `**Latency:** \`${response}\`ms`,
          color: Colors.Green,
        },
      ],
    });
  },
});
