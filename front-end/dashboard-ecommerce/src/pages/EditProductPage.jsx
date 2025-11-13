import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm";

function EditProductPage() {
  const { productId } = useParams();
  const { products, setProducts } =
    useOutletContext(); /* no tenia la variable productos y usaba fetch */
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const product = products.find((p) => p.id === Number(productId));
    if (!product) {
      setError("Error al cargar producto");
    } else {
      setProductData(product); /* tenia data y no product */
    }
  }, [productId, products]);

  const handleUpdate = (formData) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === Number(productId) ? { ...p, ...formData } : p
      )
    );

    navigate("/");
  };

  if (error) return <div className="error-container">Error: {error}</div>;
  if (!productData) return <div>No se encontró el producto.</div>;

  return (
    <div>
      <ProductForm onSubmit={handleUpdate} initialData={productData} />
    </div>
  );
}

export default EditProductPage;
