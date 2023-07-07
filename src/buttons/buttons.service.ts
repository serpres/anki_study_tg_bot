import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'src/i18n/generated/i18n.generated';
import { SCENES_MAP } from 'src/scenes/scenes.map';
import { Markup } from 'telegraf';

@Injectable()
export class ButtonsService {
  constructor(private readonly i18n: I18nService<I18nTranslations>) {}

  actionButtons(lang: string) {
    return Markup.keyboard(
      [
        Markup.button.callback(
          this.i18n.t('buttons.main_keyboard.MY_FOLDERS', {
            lang: lang,
          }),
          SCENES_MAP.folder.GET,
        ),
        Markup.button.callback(
          this.i18n.t('buttons.main_keyboard.CREATE_FOLDER', {
            lang: lang,
          }),
          SCENES_MAP.folder.CREATE,
        ),
        Markup.button.callback(
          this.i18n.t('buttons.main_keyboard.SUBSCRIPTION', {
            lang: lang,
          }),
          SCENES_MAP.subscription.SUBSCRIPTION,
        ),
        Markup.button.callback(
          this.i18n.t('buttons.main_keyboard.SETTINGS', {
            lang: lang,
          }),
          SCENES_MAP.settings.SETTINGS,
        ),
      ],
      { columns: 2 },
    ).resize(true);
  }

  cancelButton(lang: string) {
    return Markup.inlineKeyboard([
      [
        Markup.button.callback(
          this.i18n.t('buttons.CANCEL', {
            lang: lang,
          }),
          SCENES_MAP.common_actions.CANCEL,
        ),
      ],
    ]);
  }

  mapFolders(lang: string, folders: any[]) {
    return Markup.inlineKeyboard([
      ...folders.map((folder) => [
        Markup.button.callback(folder.name, String(folder.id)),
      ]),
      [
        Markup.button.callback('⏮️', 'prev'),
        Markup.button.callback('⏩', 'next'),
      ],
      [Markup.button.callback(this.i18n.t('buttons.EXIT'), 'exit')],
    ]);
  }
}
