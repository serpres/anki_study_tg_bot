import { FolderEntity } from 'src/folder/folder.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  telegramId: string | number;

  @Column({ type: 'text', nullable: true })
  subscribedUntil: string;

  @OneToMany(() => FolderEntity, (folder) => folder.user)
  folders: FolderEntity[];
}
