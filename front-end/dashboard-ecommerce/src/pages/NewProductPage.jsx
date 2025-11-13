import { useNavigate, useOutletContext } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useState } from "react"; /* no lo estaba usando */

function NewProductPage() {
  const { setProducts } = useOutletContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleCreate = async (formData) => {
    try {
      setError(null);
      setLoading(true);
      await sleep(1500);

      const willFail = Math.random() < 0.3;
      if (willFail) {
        throw new Error("¡Error de red simulado al crear el producto!");
      }

      const newProduct = {
        ...formData,
        id: Date.now(),
      };
      setProducts((prevProducts) => [newProduct, ...prevProducts]);
      navigate("/"); /* lo estaba usando afuera tambien */
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const initialData = {
    title: "",
    description: "",
    price: 0,
    category: "",
    thumbnail: "",
  };
  /* en este return no estaba mostrando los mensajes de error y loading */
  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading-container">Cargando...</p>}
      <ProductForm onSubmit={handleCreate} initialData={initialData} />
    </div>
  );
}

export default NewProductPage;
