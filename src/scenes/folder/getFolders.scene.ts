import { I18nService } from 'nestjs-i18n';
import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { ButtonsService } from 'src/buttons/buttons.service';
import { FolderService } from 'src/folder/folder.service';
import { SceneContext } from 'telegraf/typings/scenes';

import { SCENES_MAP } from '../scenes.map';

@Scene(SCENES_MAP.folder.GET)
export class GetFolders {
  constructor(
    private folderService: FolderService,
    private buttonService: ButtonsService,
    private i18n: I18nService,
  ) {}

  @SceneEnter()
  async enter(@Ctx() context: SceneContext) {
    const ownerTelegramId = context.message.from.id;
    const folders = await this.folderService.getFolders(ownerTelegramId);

    if (folders) {
      context.reply(
        this.i18n.t('bot.folder.MY_FOLDERS'),
        this.buttonService.mapFolders(context['session']['language'], folders),
      );
    } else {
      context.reply(this.i18n.t('bot.folder.NO_FOLDERS'));
    }
    context.scene.leave();
  }

  @Action(SCENES_MAP.common_actions.CANCEL)
  async cancel(@Ctx() context: SceneContext) {
    context.deleteMessage();
    context.scene.leave();
  }
}
