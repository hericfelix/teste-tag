import { createContext, ReactNode, useContext, useState } from 'react';
import api from '../../services';
import { ICategory } from '../../ts/interfaces';

interface CategoriesProps {
  children: ReactNode;
}

interface CategoriesContextData {
  categories: ICategory[];
  getCategories: () => void;
}

const CategoriesContext = createContext<CategoriesContextData>(
  {} as CategoriesContextData
);

export const CategoriesProvider = ({ children }: CategoriesProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const getCategories = () => {
    api
      .get('categories')
      .then((res) => res.data)
      .then((res) => setCategories(res))
      .catch((_) => {
        setCategories([]);
      });
  };

  return (
    <CategoriesContext.Provider value={{ categories, getCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
