import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type User = {
  id?: string;
  email: string;
  username: string;
  role: string;
  password?: string;
  re_password?: string;
  location?: string;
  phone?: number;
};

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setuser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("cart"); 
    },
  },
});

export const { setuser, logout } = userSlice.actions;
export default userSlice.reducer;
