import { ReactNode } from 'react';
import { CategoriesProvider } from './categories';
import { LoginProvider } from './login';
import { ModalProvider } from './modal';
import { PaginationProvider } from './pagination';
import { ProductsProvider } from './products';

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <LoginProvider>
      <ProductsProvider>
        <CategoriesProvider>
          <ModalProvider>
            <PaginationProvider>{children}</PaginationProvider>
          </ModalProvider>
        </CategoriesProvider>
      </ProductsProvider>
    </LoginProvider>
  );
};

export default Providers;
