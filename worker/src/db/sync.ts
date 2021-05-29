import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { SyncError } from "../types";

@Entity()
export class Sync {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  status!: string;

  @Column()
  percent_complete!: string;

  @Column({ type: 'jsonb' })
  errors!: { errors:  SyncError[] };

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
