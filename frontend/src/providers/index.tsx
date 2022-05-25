import { ReactNode } from 'react';
import { LoginProvider } from './login';
import { ProductsProvider } from './products';

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <LoginProvider>
      <ProductsProvider>{children}</ProductsProvider>
    </LoginProvider>
  );
};

export default Providers;
