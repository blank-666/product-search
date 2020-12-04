import './App.css';
import React from 'react';
import FilterableProductTable from './components/Product-table';
import PRODUCTS from './components/Products';

function App() {
  return (
    <div className="App">
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
}

export default App;
