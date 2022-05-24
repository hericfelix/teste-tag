import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Product from '../product';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column({ unique: true, length: 45 })
  email: string;

  @Column()
  password: string;

  @OneToMany((type) => Product, (product) => product.user)
  products?: Product[];
}

export default User;
