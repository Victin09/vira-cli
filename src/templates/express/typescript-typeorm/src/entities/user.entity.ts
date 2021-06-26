import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity('users')
class User {
 
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column()
    email!: string;

    @Column()
    firstName!: string;
    
    @Column()
    lastName!: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        const salt: number = Number(process.env.HASH_SALT) || 10;
        this.password = bcrypt.hashSync(this.password, salt);
    }
}

export default User;
