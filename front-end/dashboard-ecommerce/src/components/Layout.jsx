import { NavLink, Outlet } from "react-router-dom";

function Layout({
  products,
  setProducts,
  loading,
  setLoading,
  error,
  setError,
}) {
  return (
    <div className="app-layout">
      <nav className="sidebar">
        <div className="sidebar-header">Dashboard</div>
        <div className="sidebar-nav">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
                end
              >
                Inventario
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/new"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Añadir Producto
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <main className="mian-content">
        <Outlet
          context={{
            products,
            setProducts,
            loading,
            setLoading,
            error,
            setError,
          }}
        />
      </main>
    </div>
  );
}

export default Layout;
