import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login_user } from "../../store/slices/userSlice.js";
import API from "../../api/API.js";
import { NavLink } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const triggerLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("token/", formData);
      const accessToken = res.data.access;
      localStorage.setItem("access_token", accessToken);
      dispatch(login_user(accessToken));
      navigate("/");
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={(e) => triggerLogin(e)}>
          <div className="input-container">
            <i className="fi fi-rr-envelope" />
            <input
              type="text"
              placeholder="username"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="input-container">
            <i className="fi fi-rr-lock"></i>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <button>Login</button>
        </form>
        <NavLink to="/register">SIGN UP</NavLink>
      </div>
    </>
  );
}

export default LoginPage;
