import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import ProductListPage from "./pages/ProductListPage";
import NewProductPage from "./pages/NewProductPage";
import EditProductPage from "./pages/EditProductPage";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok)
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              products={products}
              setProducts={setProducts}
              loading={loading}
              setLoading={setLoading}
              error={error}
              setError={setError}
            />
          }
        >
          <Route index element={<ProductListPage />} />
          <Route path="new" element={<NewProductPage />} />
          <Route path="edit/:productId" element={<EditProductPage />} />
          <Route
            path="*"
            element={<div>Lo sentimos, no pudimos encontrar la pagina</div>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
