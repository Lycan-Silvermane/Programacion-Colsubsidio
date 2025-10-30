import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react"; /*no estaba usandolo */

function ProductListPage() {
  const { products, setProducts, loading, setLoading, error, setError } =
    useOutletContext(); /* no tenia el setError */

  const [deleteId, setDeleteId] = useState(null); /* no defini constantes */

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleDelete = async (productId) => {
    if (
      window.confirm("¿Estas seguro de que quieres eliminar este producto?")
    ) {
      try {
        setError(null);
        setLoading(true);
        setDeleteId(productId);

        await sleep(1500);

        const willFail = Math.random() < 0.4;
        if (willFail) {
          throw new Error(
            "¡Error de red simulado! No se pudo conectar con el servidor"
          );
        }

        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== productId)
        );
      } catch (err) {
        console.error("Error simulado:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
        setDeleteId(null);
      }
    }
  };
  if (loading) {
    return <div className="loader-container">Cargando los productos...</div>;
  }

  if (error) {
    return <div className="error-container">Ocurrio el error: {error}</div>;
  }

  return (
    <div className="product-table-wrapper">
      <h1>Inventario de Productos</h1>
      {products.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-thumbnail"
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>
                  <div className="product-actions">
                    <Link to={`/edit/${product.id}`} className="btn btn-edit">
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="btn btn-delete"
                      disable={deleteId === product.id}
                    >
                      {deleteId === product.id ? "Eliminando..." : "Eliminar"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductListPage;
