import { CardEntity } from 'src/card/card.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Folder' })
export class FolderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.folders)
  user: UserEntity;

  @OneToMany(() => CardEntity, (card) => card.folder)
  cards: CardEntity[];
}
