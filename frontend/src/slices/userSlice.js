import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
  user: [],
  error: false,
  sucess: false,
  loading: false,
  message: null,
};

// Get user details to form user
export const profile = createAsyncThunk(
  "use/profile",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token; //Salvo nos states do auth, objeto user, state token
    const data = await userService.profile(user, token);

    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    //Register
    builder.addCase(profile.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(profile.fulfilled, (state, action) => {
      state.loading = false;
      state.sucess = true;
      state.error = null;
      state.user = action.payload;
    });
    //Teoricamente, não haverá erros
    // builder.addCase(profile.rejected, (state, action) => {
    //   //1.3 Req rejeitada.
    //   state.loading = false;
    //   state.error = action.payload; //1.4 Pegando os erros da API e passando para o estado 1.1
    //   state.user = null;
    // });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
