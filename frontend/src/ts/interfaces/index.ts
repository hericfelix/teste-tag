export interface IProduct {
  id: string;
  name: string;
  status: string;
  created: string;
  imageUrl: string;
  category: {
    id: string;
    name: string;
  };
}

export interface UserData {
  email: string;
  password: string;
}
