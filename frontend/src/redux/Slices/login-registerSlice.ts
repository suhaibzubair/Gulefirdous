import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Login } from "../../pages/auth/login/Login.d";
import { Register } from "../../pages/auth/register/Register.d";

// Thunk to fetch posts

export const register = createAsyncThunk(
  "register",
  async (payload: Register, thunkApi) => {
    try {
      const response = await axios.post<Register>(
        "http://localhost:4000/register",
        payload
      );
      console.log("response", response);
      return response.data;
    } catch (error: any) {
      console.log(error)
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// Thunk for user login
export const login = createAsyncThunk(
  "login",
  async (payload: Login, thunkApi) => {
    try {
      const response = await axios.post<Login>(
        "http://localhost:4000/login",
        payload
      );
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const updateUser = createAsyncThunk ('update',
async (payload:any,thunkApi) => {
try{  const response =await axios.patch(
    "http://localhost:4000/login",payload
  )
  return response.data;
}catch(error:any){
  const message = error.message;
  return thunkApi.rejectWithValue(message);
}
})
interface UserSate {
  loading: boolean;
  error: string | null;
  user: null;
}

const initialState: UserSate = {
  loading: false,
  error: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
        // You may want to update the state based on successful login
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      })
  },
});

export default userSlice.reducer;
