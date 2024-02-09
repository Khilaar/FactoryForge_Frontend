import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  login_user,
  set_avatar,
  set_id,
} from "../../store/slices/userSlice.js";
import API from "../../api/API.js";

function LoginPage() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const retrieveUser = async () => {
      

    if (data) {
      const userId = data.user.id;
      const userAvatar = data.user.avatar;
      const accessToken = data.access;
      const username = data.user.username;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", username);
      dispatch(login_user(data));
      dispatch(set_id(userId));
      dispatch(set_avatar(userAvatar));
      navigate("/dashboard");
    }
  }

  useEffect(() => {
    retrieveUser();
  }, []);

  return <div className="login_container">test</div>;
}

export default LoginPage;
