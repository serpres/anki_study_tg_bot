import { I18nService } from 'nestjs-i18n';
import { Action, Ctx, Hears, Scene, SceneEnter } from 'nestjs-telegraf';
import { ButtonsService } from 'src/buttons/buttons.service';
import { FolderService } from 'src/folder/folder.service';
import { Message } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';

import { SCENES_MAP } from '../scenes.map';

@Scene(SCENES_MAP.folder.CREATE)
export class CreateFolder {
  constructor(
    private readonly folderService: FolderService,
    private readonly i18n: I18nService,
    private readonly buttonService: ButtonsService,
  ) {}

  @SceneEnter()
  async enter(@Ctx() context: SceneContext) {
    context.reply(
      this.i18n.t('bot.folder.ENTER_FOLDER_NAME'),
      this.buttonService.cancelButton(context['session']['language']),
    );
  }

  @Hears(/.*/)
  async onName(@Ctx() context: SceneContext) {
    const message = context.message as Message & { text: string };
    const folder = await this.folderService.createFolder({
      ownerTelegramId: context.message.from.id,
      name: message.text,
    });
    if (folder) {
      context.reply(
        this.i18n.t('bot.folder.FOLDER_CREATED', {
          args: { folder: message.text },
        }),
      );
    } else {
      context.reply(
        this.i18n.t('bot.folder.CREATE_ERROR', {
          args: { folder: message.text },
        }),
      );
    }
    context.scene.leave();
  }

  @Action(SCENES_MAP.common_actions.CANCEL)
  async cancel(@Ctx() context: SceneContext) {
    context.deleteMessage();
    context.scene.leave();
  }
}
