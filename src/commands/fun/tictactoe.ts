import { Command } from '../../lib/modules/Command';
import { ApplicationCommandOptionType, Colors } from 'discord.js';
import TicTacToe from 'discord-tictactoe';

export default new Command({
  name: 'tictactoe',
  description: 'Tic Tac Toeをプレイします',
  options: [
    {
      name: 'user',
      description: 'Tic Tac Toeをプレイするユーザー',
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  ephemeral: false,
  execute: async ({ client, interaction }) => {
    const ttt_client = new TicTacToe({
      language: `file://${__dirname}/../../config/languages/ja.json`,
      aiDifficulty: "Hard",
      commandOptionName: 'user',
      gameBoardEmbed: true,
    });

    ttt_client.handleInteraction(interaction);
  },
});