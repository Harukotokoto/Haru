import { Event } from '../../lib/modules/Event';
import { client } from '../../index';
import { CommandError } from '../../lib/utils/CommandError';
import { ComponentError } from '../../lib/utils/ComponentError';
import { Colors } from 'discord.js';
import { footer } from '../../lib/utils/Embed';

export default new Event('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId.startsWith('button_verify')) {
    const Error = new ComponentError(interaction);

    const member = interaction.guild?.members.cache.get(interaction.user.id);
    if (!member) return await Error.create('メンバーが見つかりませんでした');

    const roleId = interaction.customId.split('-')[1];
    const role = interaction.guild?.roles.cache.get(roleId);
    if (!role) return await Error.create('ロールが見つかりませんでした');

    if (member.roles.cache.has(role.id)) {
      return await Error.create('既に認証されています');
    } else {
      member.roles
      .add(role)
      .then(async () => {
        await interaction.reply({
          embeds: [
            {
              description: '認証が完了しました',
              color: Colors.Green,
              footer: footer()
            }
          ],
          ephemeral: true,
        });
      })
      .catch(async () => {
        await Error.create('ロールを付与できませんでした');
      });
    }
  }
});
