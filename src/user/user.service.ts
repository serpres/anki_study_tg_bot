import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async findUser(telegramId: UserEntity['telegramId']): Promise<UserEntity> {
    return this.repository.findOneBy({ telegramId });
  }

  async createUser(telegramId: UserEntity['telegramId']) {
    const user = await this.repository.create({ telegramId });
    await this.repository.save(user);
    return user;
  }
}
