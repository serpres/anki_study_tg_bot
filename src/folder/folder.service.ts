import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

import { FolderEntity } from './folder.entity';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(FolderEntity)
    private repository: Repository<FolderEntity>,
    private userService: UserService,
  ) {}

  async createFolder({
    ownerTelegramId,
    name,
  }: {
    ownerTelegramId: number;
    name: string;
  }) {
    try {
      const creator = await this.userService.findUser(ownerTelegramId);
      const folder = await this.repository.create({ name, user: creator });

      if (!creator || !folder) {
        return;
      }
      await this.repository.save(folder);
      return folder;
    } catch (e) {
      console.log(e);
    }
  }

  async getFolders(ownerTelegramId: number) {
    try {
      const folders = this.repository.findBy({
        user: { telegramId: ownerTelegramId },
      });
      return folders;
    } catch (e) {
      console.log(e);
    }
  }
}
