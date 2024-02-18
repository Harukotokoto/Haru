import {
  AnySelectMenuInteraction,
  ButtonInteraction,
  Colors,
} from 'discord.js';
import { footer } from './Embed';

export enum ErrorTypes {
  Warn = Colors.Yellow,
  Error = Colors.Red,
}

type options = {
  ErrorType?: ErrorTypes;
  ephemeral?: boolean;
};

export class ComponentError {
  private readonly parent: ButtonInteraction | AnySelectMenuInteraction;

  public constructor(parent: ButtonInteraction | AnySelectMenuInteraction) {
    this.parent = parent;
  }

  public async create(message: string, options?: options) {
    await this.parent.reply({
      embeds: [
        {
          title:
            options?.ErrorType === ErrorTypes.Error
              ? 'エラーが発生しました'
              : undefined,
          description: message,
          color: options?.ErrorType || Colors.Red,
          footer: footer(),
        },
      ],
      ephemeral: options?.ephemeral || true,
    });
  }
}
