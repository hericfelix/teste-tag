import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Product from '../product';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true, length: 45 })
  name: string;

  @OneToMany((type) => Product, (product) => product.category)
  products: Product[];
}

export default Category;
