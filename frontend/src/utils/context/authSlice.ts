import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: UserData | null;
  token: string | null;
  posts: any[];
}

interface UserData {
  id: number;
  userName: string;
  email: string;
  bio:string;
  phone:string;
  gender:string;
  isPrivate:boolean;
  isVerified:boolean;
  token: string;
}

const userInitialState: AuthState = {
  user: null,
  token: null,
  posts: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: userInitialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: UserData }>) => {
      state.user = action.payload.user;
      state.token = action.payload.user.token;
    },
    updateUser:(state,action:PayloadAction<{user:UserData}>)=>{
      state.user=action.payload.user;

    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.posts = [];
    },
    setPosts: (state, action: PayloadAction<{ posts: any[] }>) => {
      state.posts = action.payload.posts;
    },
  },
});

export const { loginSuccess, logout, setPosts,updateUser  } = authSlice.actions;
export default authSlice.reducer;