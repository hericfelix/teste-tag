import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { IProduct } from '../../ts/interfaces';
import { useProducts } from '../products';

interface PaginationProps {
  children: ReactNode;
}

interface PaginationContextData {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  lastPage: number;
  paginatedProducts: IProduct[];
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationContext = createContext<PaginationContextData>(
  {} as PaginationContextData
);

export const PaginationProvider = ({ children }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [lastPage, setLastPage] = useState<number>(20);
  const [paginatedProducts, setPaginatedProducts] = useState<IProduct[]>([]);

  const { filteredProducts } = useProducts();

  useEffect(() => {
    setCurrentPage(0);
    setLastPage(Math.ceil(filteredProducts.length / itemsPerPage));

    setPaginatedProducts(
      filteredProducts.slice(0 * itemsPerPage, (0 + 1) * itemsPerPage)
    );
  }, [filteredProducts, itemsPerPage]);

  useEffect(() => {
    setPaginatedProducts(
      filteredProducts.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      )
    );
  }, [currentPage]);

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        lastPage,
        setCurrentPage,
        paginatedProducts,
        setItemsPerPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => useContext(PaginationContext);
