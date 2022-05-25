import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import api from '../../services';
import { IProduct } from '../../ts/interfaces';
import { useLogin } from '../login';

interface ProductsProviderProps {
  children: ReactNode;
}

interface ProductsContextData {
  products: IProduct[];
  filteredProducts: IProduct[];
  getProducts: (query: string) => void;
  createProduct: (data: FormData) => void;
  deleteProducts: () => void;
  updateProduct: (data: FormData) => void;
  addToDelete: (id: string) => void;
  removeFromDelete: (id: string) => void;
  editModalVisible: boolean;
  deleteModalVisible: boolean;
  editId: string;
  setFilteredProducts: Dispatch<React.SetStateAction<IProduct[]>>;
  setEditId: Dispatch<React.SetStateAction<string>>;
  setEditModalVisible: Dispatch<React.SetStateAction<boolean>>;
  setDeleteModalVisible: Dispatch<React.SetStateAction<boolean>>;
  setDeleteIds: Dispatch<React.SetStateAction<string[]>>;
  setQuery: Dispatch<React.SetStateAction<string[]>>;
  query: string[];
  deleteIds: string[];
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const { token } = useLogin();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [deleteIds, setDeleteIds] = useState<string[]>([]);
  const [editId, setEditId] = useState<string>('');
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [query, setQuery] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  const getProducts = async () => {
    api
      .get(`products${query.length > 0 ? `?${query.join('&')}` : ''}`)
      .then((res) => res.data)
      .then((res) => {
        setProducts(res);
        setFilteredProducts(res);
      })
      .catch((_) => {
        setProducts([]);
        setFilteredProducts([]);
      });
  };

  const createProduct = async (data: FormData) => {
    await api
      .post('products', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .then((res) => toast.success(res.message))
      .catch((err) => toast.error(err.error));

    await getProducts();
  };

  const updateProduct = async (data: FormData) => {
    await api
      .patch(`products/${editId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .then((res) => {
        toast.success('product updated');
      })
      .catch((err) => toast.error(err.error));

    await getProducts();
  };

  const deleteProducts = async () => {
    await api
      .delete('products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ids: deleteIds,
        },
      })
      .then((_) => toast.success('product(s) deleted'))
      .catch((_) => toast.error('an error ocurred'));

    await getProducts();
  };

  const addToDelete = (id: string) => {
    setDeleteIds([id, ...deleteIds]);
  };

  const removeFromDelete = (id: string) => {
    setDeleteIds(deleteIds.filter((el) => el !== id));
  };

  return (
    <ProductsContext.Provider
      value={{
        addToDelete,
        createProduct,
        deleteProducts,
        getProducts,
        products,
        removeFromDelete,
        updateProduct,
        setEditId,
        deleteModalVisible,
        editModalVisible,
        setDeleteIds,
        setDeleteModalVisible,
        setEditModalVisible,
        editId,
        setQuery,
        query,
        filteredProducts,
        setFilteredProducts,
        deleteIds,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
