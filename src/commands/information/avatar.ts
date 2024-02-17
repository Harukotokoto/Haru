import { ApplicationCommandOptionType, Colors } from "discord.js";
import { Command } from "../../lib/modules/Command";
import { footer } from "../../lib/utils/Embed";

export default new Command({
  name: "avatar",
  description: "指定したユーザーのアバターを表示します",
  options: [
    {
      name: "user",
      description: "アバターを表示するユーザー",
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  ephemeral: false,
  execute: async ({ interaction }) => {
    const user = interaction.options.getUser("user") || interaction.user;

    await interaction.followUp({
      embeds: [
        {
          title: `${user.tag}のアバター`,
          image: {
            url: user.displayAvatarURL({ size: 4096 }),
          },
          color: Colors.Blue,
          footer: footer(),
        }
      ]
    });
  },
});