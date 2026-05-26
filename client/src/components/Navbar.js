import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const logout = () => {
    localStorage.removeItem("jwt_token");
    window.location.replace("/login");
  };

  return (
    <navbar>
      <Link to="/">
        <button>Dashboard</button>
      </Link>

      <Link to="/slots">
        <button>Slots</button>
      </Link>

      <Link to="/reservations">
        <button>Reservations</button>
      </Link>

      <button
        style={{ float: "right" }}
        className="logout-btn"
        onClick={logout}
      >
        Logout
      </button>
    </navbar>
  );
};

export default Navbar;
