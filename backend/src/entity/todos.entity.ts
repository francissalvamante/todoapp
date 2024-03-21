import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Todos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: "boolean",
    default: false,
  })
  completed: boolean;

  @CreateDateColumn()
  dateAdded: Date;

  @Column({
    type: "date",
    default: null,
  })
  dateCompleted: Date;

  @Column()
  identifier: string;
}
