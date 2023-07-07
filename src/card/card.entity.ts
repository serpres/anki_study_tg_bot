import { FolderEntity } from 'src/folder/folder.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Card' })
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  frontSide: string;

  @Column({ type: 'text', nullable: true })
  backSide: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  knowledgeLevel: number;

  @ManyToOne(() => FolderEntity, (folder) => folder.cards)
  folder: FolderEntity;
}
