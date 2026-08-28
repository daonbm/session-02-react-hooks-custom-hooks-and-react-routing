import React from 'react'
import { CartProvider } from './context/CartProvider'
import CartSummary from './components/CartSummary'
import ProductList from './components/ProductList'
import CartView from './components/CartView'

const App4: React.FC = () => {
  return (
    <CartProvider>
      <CartSummary />

      <main>
        <ProductList />
        <CartView/>
      </main>
    </CartProvider>
  );
}

export default App4