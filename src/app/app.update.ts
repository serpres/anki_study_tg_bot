import { I18nService } from 'nestjs-i18n';
import { Ctx, Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { ButtonsService } from 'src/buttons/buttons.service';
import { MAIN_KEYBOARD } from 'src/i18n/consts';
import { I18nTranslations } from 'src/i18n/generated/i18n.generated';
import { UserService } from 'src/user/user.service';
import { Context, Telegraf } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly userService: UserService,
    private readonly i18n: I18nService<I18nTranslations>,
    private readonly buttonService: ButtonsService,
  ) {}

  @Start()
  async startCommand(context: Context) {
    context['session']['language'] = context.message.from.language_code;

    const userId = context.message.from.id;
    const user = await this.userService.findUser(userId);

    if (user) {
      await context.reply(
        this.i18n.t('bot.start.WELCOME_FIRST'),
        this.buttonService.actionButtons(context['session']['language']),
      );
    }
    if (!user) {
      const createdUser = await this.userService.createUser(userId);
      if (createdUser) {
        await context.reply(
          this.i18n.t('bot.start.WELCOME_AGAIN'),
          this.buttonService.actionButtons(context['session']['language']),
        );
      } else await context.reply(this.i18n.t('bot.start.ERROR'));
    }
  }

  @Hears(MAIN_KEYBOARD.MY_FOLDERS)
  async myFolders(@Ctx() context: SceneContext) {
    context.scene.enter('getFolders');
  }

  @Hears(MAIN_KEYBOARD.CREATE_FOLDER)
  async createFolder(@Ctx() context: SceneContext) {
    context.scene.enter('createFolder');
  }

  @Hears(MAIN_KEYBOARD.SETTINGS)
  async settings(@Ctx() context: SceneContext) {
    context.reply('Настройки');
  }

  @Hears(MAIN_KEYBOARD.SUBSCRIPTION)
  async subscription(@Ctx() context: SceneContext) {
    context.reply('подписка');
  }
}
