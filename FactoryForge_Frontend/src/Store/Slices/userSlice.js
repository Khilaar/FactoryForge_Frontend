import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    access_token: undefined,
    id: 0,
    avatar: "",
  },
  reducers: {
    login_user: (state, action) => {
      state.username = action.payload.user.username;
      state.access_token = action.payload.access;
    },
    logout_user: (state) => {
      state.username = "";
      state.access_token = null;
      localStorage.setItem("accessToken", "");
      localStorage.setItem("userId", "");
      localStorage.setItem("avatar", "");
    },
    load_user: (state, action) => {
      state.details = action.payload;
    },
    set_id: (state, action) => {
      state.id = action.payload;
      localStorage.setItem("userId", action.payload);
    },
    set_avatar: (state, action) => {
      state.avatar = action.payload;
      localStorage.setItem("avatar", action.payload);
    },
  },
});

export const { login_user, logout_user, load_user, set_id, set_avatar } =
  userSlice.actions;

export default userSlice.reducer;
