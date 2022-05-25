export interface IProduct {
  id: string;
  name: string;
  status: string;
  created: string;
  imageUrl: string;
  category: ICategory;
}

export interface ICategory {
  id: string;
  name: string;
}
