import Login from "../src/pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import SignUp from "./pages/signUp";
import Error from "./pages/Error";
import PrivateRouteLayout from "./Layout/PrivateRouteLayout";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Error" element={<Error />} />

          {/* protected */}
          <Route element={<PrivateRouteLayout />}>
            <Route path="/Home" element={<Home />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
