import { ICategory } from './category.model';

export interface IProduct {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string
  category: ICategory;
  taxes?: number;
}

export interface ICreateProductDTO extends Omit<IProduct, 'id' | 'category'> {
  categoryId: number;
}

export type IUpdateProductDTO = Partial<ICreateProductDTO>
