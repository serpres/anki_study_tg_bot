import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppUpdate } from 'src/app/app.update';
import { ButtonsModule } from 'src/buttons/buttons.module';
import { CardModule } from 'src/card/card.module';
import { getTelegrafConfig } from 'src/configs/telegraf.config';
import { getTypeOrmConfig } from 'src/configs/typeorm.config';
import { FolderEntity } from 'src/folder/folder.entity';
import { FolderModule } from 'src/folder/folder.module';
import { I18nTranslateModule } from 'src/i18n/i18n.module';
import { ScenesModule } from 'src/scenes/scenes.module';
import { UserEntity } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TelegrafModule.forRootAsync(getTelegrafConfig()),
    TypeOrmModule.forRootAsync(getTypeOrmConfig()),
    TypeOrmModule.forFeature([FolderEntity, UserEntity]),
    UserModule,
    ButtonsModule,
    ScenesModule,
    FolderModule,
    CardModule,
    I18nTranslateModule,
  ],
  controllers: [],
  providers: [AppUpdate],
})
export class AppModule {}
