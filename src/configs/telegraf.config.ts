import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModuleAsyncOptions } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';

const sessions = new LocalSession({ database: 'session_db.json' });

export const getTelegrafConfig = (): TelegrafModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    middlewares: [sessions.middleware()],
    token: configService.get('TELEGRAM_TOKEN' ?? ''),
  }),
});
