import { Schema } from '@nestjs/mongoose';
import { PrimaryGeneratedColumn } from 'typeorm';

@Schema()
export class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
