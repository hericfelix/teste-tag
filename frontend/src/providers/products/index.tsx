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
  getProducts: (query: string) => void;
  createProduct: (data: FormData) => void;
  deleteProducts: (ids: string[]) => void;
  updateProduct: (data: FormData) => void;
  addToDelete: (id: string) => void;
  removeFromDelete: (id: string) => void;
  editModalVisible: Boolean;
  deleteModalVisible: Boolean;
  setEditId: Dispatch<React.SetStateAction<string>>;
  setEditModalVisible: Dispatch<React.SetStateAction<Boolean>>;
  setDeleteModalVisible: Dispatch<React.SetStateAction<Boolean>>;
  setDeleteIds: Dispatch<React.SetStateAction<string[]>>;
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const { token } = useLogin();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [deleteIds, setDeleteIds] = useState<string[]>([]);
  const [editId, setEditId] = useState<string>('');
  const [editModalVisible, setEditModalVisible] = useState<Boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<Boolean>(false);

  const getProducts = async (query: string = '') => {
    api
      .get(`products${query}`)
      .then((res) => res.data)
      .then((res) => setProducts(res))
      .catch((_) => {
        setProducts([]);
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
      .then((res) => toast.success(res.message))
      .catch((err) => toast.error(err.error));

    await getProducts();
  };

  const deleteProducts = async (ids: string[] = deleteIds) => {
    await api
      .delete('products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ids: ids,
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
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
