import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

import { FolderEntity } from './folder.entity';
import { FolderService } from './folder.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([FolderEntity])],
  providers: [FolderService],
  exports: [FolderService],
})
export class FolderModule {}
