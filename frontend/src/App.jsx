import Login from "./pages/Login";
import Register from "./pages/Register";
import Sweets from "./pages/Sweets";
import { useAuth } from "./context/AuthContext";
import AddSweet from "./components/AddSweet";


function App() {
  const { token, role, logout } = useAuth();

  // NOT LOGGED IN
  if (!token) {
    return (
      <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
        <h1>🍬 Sweet Shop</h1>

        <Register />
        <hr />
        <Login />
      </div>
    );
  }

  // LOGGED IN
  return (
    <div style={{ padding: "20px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>🍬 Sweet Shop</h1>

        <div>
          <span style={{ marginRight: "10px" }}>
            Role: <strong>{role}</strong>
          </span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <hr />

      {/* SWEETS DASHBOARD */}
      <Sweets />

      {/* ADMIN SECTION */}
      {role === "ADMIN" && (
  <>
    <hr />
    <h2>👑 Admin Controls</h2>
    <AddSweet onAdded={() => window.location.reload()} />
  </>
)}
    </div>
  );
}

export default App;
