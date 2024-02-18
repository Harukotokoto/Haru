import { Event } from '../../lib/modules/Event';
import { client } from '../../index';
import { CommandError } from '../../lib/utils/CommandError';
import { ComponentError } from '../../lib/utils/ComponentError';

export default new Event('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId.startsWith('button_verify')) {
    const Error = new ComponentError(interaction);

    const member = interaction.guild?.members.cache.get(interaction.user.id);
    if (!member) return await Error.create('メンバーが見つかりませんでした');

    const roleId = interaction.customId.split('-')[1];
    const role = interaction.guild?.roles.cache.get(roleId);
    if (!role) return await Error.create('ロールが見つかりませんでした');

    member.roles
      .add(role)
      .then(async () => {
        await interaction.reply({
          content: '認証が完了しました',
          ephemeral: true,
        });
      })
      .catch(async () => {
        await Error.create('ロールを付与できませんでした');
      });
  }
});
