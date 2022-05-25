import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from 'react';

interface ModalProviderProps {
  children: ReactNode;
}

interface ModalContextData {
  editModalVisible: boolean;
  deleteModalVisible: boolean;
  createModalVisible: boolean;
  setCreateModalVisible: Dispatch<React.SetStateAction<boolean>>;
  setEditModalVisible: Dispatch<React.SetStateAction<boolean>>;
  setDeleteModalVisible: Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

  return (
    <ModalContext.Provider
      value={{
        deleteModalVisible,
        editModalVisible,
        createModalVisible,
        setCreateModalVisible,
        setDeleteModalVisible,
        setEditModalVisible,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
