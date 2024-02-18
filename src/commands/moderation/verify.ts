import { Command } from '../../lib/modules/Command';
import {
  ApplicationCommandOptionType,
  ButtonStyle,
  Colors,
  ComponentType,
} from 'discord.js';
import { footer } from '../../lib/utils/Embed';

export default new Command({
  name: 'verify',
  description: '認証パネルの設定を行います',
  options: [
    {
      name: 'button',
      description: 'ボタン認証を設定します',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'role',
          description: '認証後に付与するロール',
          type: ApplicationCommandOptionType.Role,
          required: true,
        },
      ],
    },
  ],
  ephemeral: false,
  execute: async ({ client, interaction }) => {
    const role = interaction.options.getRole('role', true);

    switch (interaction.options.getSubcommand()) {
      case 'button':
        await interaction.followUp({
          embeds: [
            {
              title: '簡易認証',
              description:
                '`クリックして認証`ボタンをクリックすると認証が完了します。\n' +
                '認証完了後、以下のロールが付与されます。\n' +
                `> **認証後に付与されるロール**: <@&${role.id}>`,
              color: Colors.Blue,
              footer: footer(),
            },
          ],
          components: [
            {
              type: ComponentType.ActionRow,
              components: [
                {
                  type: ComponentType.Button,
                  style: ButtonStyle.Secondary,
                  label: 'クリックして認証',
                  customId: 'button_verify-' + role.id,
                },
              ],
            },
          ],
        });
        break;
    }
  },
});
