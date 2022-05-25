import { ReactNode } from 'react';
import { CategoriesProvider } from './categories';
import { LoginProvider } from './login';
import { ProductsProvider } from './products';

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <LoginProvider>
      <ProductsProvider>
        <CategoriesProvider>{children}</CategoriesProvider>
      </ProductsProvider>
    </LoginProvider>
  );
};

export default Providers;
