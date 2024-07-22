// src/content/content.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column('text', { array: true })
  tags: string[];

  @CreateDateColumn()
  created_at: Date;
}
