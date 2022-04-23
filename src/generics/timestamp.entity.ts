import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";

export class TimestampEntity {
  @CreateDateColumn({
    update: false
  })
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @VersionColumn()
  version: number;
}
