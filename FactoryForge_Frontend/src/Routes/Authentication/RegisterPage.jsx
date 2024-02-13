import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../../api/API.js";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const triggerRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post();

      navigate("/");
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={triggerRegister}>
          <div className="input-container">
            <i className="fi fi-rr-user" />
            <input
              type="text"
              placeholder="Username"
              autoComplete="off"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="input-container">
          <i className="fi fi-rr-envelope" />
            <input
              type="text"
              placeholder="Email"
              autoComplete="off"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="input-container">
            <i className="fi fi-rr-lock"></i>
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </form>
      </div>
    </>
  );
}
