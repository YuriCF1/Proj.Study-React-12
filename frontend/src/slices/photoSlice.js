import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
  photos: [],
  photo: [],
  error: false,
  success: false,
  loading: false,
  message: null,
};

//Functions
//Publish user photo
export const publishPhoto = createAsyncThunk(
  "photo/publish",
  async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.publishPhoto(photo, token);

    //Check erros
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

//Get user photos
export const getUserPhotos = createAsyncThunk(
  "photo/userPhotos",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.getUserPhotos(id, token);
    return data;
  }
);

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(publishPhoto.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(publishPhoto.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.photo = action.payload;
      state.photos.unshift(state.photo); //Adicionando, no primeiro lugar do array, a foto
      state.message = "Foto publicada com sucesso!";
    });
    builder.addCase(publishPhoto.rejected, (state, action) => {
      //1.3 Req rejeitada.
      console.log(state, action);
      state.loading = false;
      state.error = action.payload; //1.4 Pegando os erros da API e passando para o estado 1.1
      state.photo = {};
      //Get User photos
    });
    builder.addCase(getUserPhotos.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getUserPhotos.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.photos = action.payload;
    });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
