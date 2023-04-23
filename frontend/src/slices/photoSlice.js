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
    console.log(token);
    const data = await photoService.getUserPhotos(id, token);
    return data;
  }
);

// Delete a photo
export const deletePhoto = createAsyncThunk(
  "photo/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.deletePhoto(id, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

//Update the photo
export const updatePhoto = createAsyncThunk(
  "photo/update",
  async (photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.updatePhoto(
      { title: photoData.title },
      photoData.id,
      token
    );

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

//Get photo by id
export const getPhotoById = createAsyncThunk(
  "photo/getPhoto",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.getPhotoById(id, token);
    return data;
  }
);

//Like a photo
export const likeAPhoto = createAsyncThunk("photo/like", async (id, token) => {
  const token = thunkAPI.getState().auth.user.token;
  const data = await photoService.likeAPhoto(id, token);

  // Check for errors
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

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
      console.log(action.payload);
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
    builder.addCase(deletePhoto.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(deletePhoto.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.success = true;
      state.error = null;
      state.photos = state.photos.filter((photo) => {
        //Filtrando as fotos, tirando a do ID que mandei
        return photo._id !== action.payload.id;
      });
      state.message = action.payload.message;
    });
    builder.addCase(deletePhoto.rejected, (state, action) => {
      console.log(state, action);
      state.loading = false;
      state.error = action.payload;
      state.photo = {};
    });
    //UPDATE PHOTO
    builder.addCase(updatePhoto.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updatePhoto.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.success = true;
      state.error = null;
      state.photos.map((photo) => {
        //O map, não retorna dados. posso definir direto, sem atribuilção "="
        if (photo._id === action.payload.photo._id) {
          return (photo.title = action.payload.photo.title); //Atualizando a foto, sem precisar fazer uma requisição
        }
        return photo;
      });
      state.message = action.payload.message;
    });
    builder.addCase(updatePhoto.rejected, (state, action) => {
      console.log(state, action);
      state.loading = false;
      state.error = action.payload;
      state.photo = {};
    });
    builder.addCase(getPhotoById.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getPhotoById.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.photo = action.payload;
    });
    builder.addCase(likeAPhoto.fulfilled, (state, action) => {
      // state.loading = false; //É uma ação tão rápida, que  nem precisa de loading
      state.success = true;
      state.error = null;
      state.photo = action.payload;

      if (state.photo.likes) {
        state.photo.likes.push(action.payload.userId);
      }

      //Chegando as fotos do feed, por exemplo. Para atualizar na tela
      state.photos.map((photo) => {
        if (photo._id === action.payload.photo.photoId) {
          return photo.likes.push(action.payload.userId);
        }
        return photo;
      });
      
    });
    builder.addCase(likeAPhoto.rejected, (state, action) => {
      console.log(state, action);
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;

/*NOTAS: 
Estrutura de actions
{
  type: 'sliceName/actionType/fulfilled',
  payload: dados retornados pela ação assíncrona 
  meta:  metadados da ação assíncrona, se houver 
}

*/
