import { Module } from '@nestjs/common';

import { ButtonsService } from './buttons.service';

@Module({
  providers: [ButtonsService],
  exports: [ButtonsService],
})
export class ButtonsModule {}
