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
  "user/profile",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token; //Salvo nos states do auth, objeto user, state token
    const data = await userService.profile(user, token);

    return data;
  }
);

//Update user details
export const updateProfile = createAsyncThunk(
  "user/update",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await userService.updateProfile(user, token);

    //Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

//Get user details
export const getUserDetails = createAsyncThunk(
  "user/get",
  async (id, thunkAPI) => {
    const data = await userService.getUserDetails(id);

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
    // Teoricamente, não haverá erros
    // builder.addCase(profile.rejected, (state, action) => {
    //   //1.3 Req rejeitada.
    //   state.loading = false;
    //   state.error = action.payload; //1.4 Pegando os erros da API e passando para o estado 1.1
    //   state.user = null;
    // });
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.sucess = true;
      state.error = null;
      state.user = action.payload;
      state.message = "Usuário atualizado com sucesso!";
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      //1.3 Req rejeitada.
      console.log(state, action);
      state.loading = false;
      state.error = action.payload; //1.4 Pegando os erros da API e passando para o estado 1.1
      state.user = {};
    });
    //Get user data
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.sucess = true;
      state.error = null;
      state.user = action.payload; //Mudando o state
    });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
