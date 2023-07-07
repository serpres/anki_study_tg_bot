import { Module } from '@nestjs/common';
import { ButtonsModule } from 'src/buttons/buttons.module';
import { FolderModule } from 'src/folder/folder.module';

import { CreateFolder } from './folder/createFolder.scene';
import { GetFolders } from './folder/getFolders.scene';

@Module({
  imports: [FolderModule, ButtonsModule],
  providers: [CreateFolder, GetFolders],
  exports: [CreateFolder, GetFolders],
})
export class ScenesModule {}
