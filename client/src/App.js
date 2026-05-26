import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";
import Slots from "./pages/Slots";
import Reservations from "./pages/Reservations";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <BrowserRouter>
    <ToastContainer />
    <Switch>
      <Route exact path="/login" component={Login} />

      <ProtectedRoute exact path="/" component={Dashboard} />

      <ProtectedRoute exact path="/slots" component={Slots} />

      <ProtectedRoute exact path="/reservations" component={Reservations} />

      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

export default App;
