import {CreateDateColumn, PrimaryGeneratedColumn} from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @CreateDateColumn()
    public createdAt: Date;

    @CreateDateColumn()
    public updatedAt: Date;

    @CreateDateColumn()
    public deletedAt: Date;
}