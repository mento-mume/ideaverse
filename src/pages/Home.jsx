import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../firebase";
const Home = () => {
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const navigate = useNavigate();
  const { name, email } = formData;
  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <>
      <div className="flex gap-8">
        welcome {name}!<button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Home;
