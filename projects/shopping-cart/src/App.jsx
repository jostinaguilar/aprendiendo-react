import { useState } from 'react';
import { Products } from './components/Products';
import { products as initialProducts } from './mocks/products.json';
import { Header } from './components/Header';
import { useFilters } from './hooks/useFilters';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const { filterProducts } = useFilters();

  return (
    <>
      <Header />
      <Products products={filterProducts(products)} />
    </>
  );
}

export default App;
