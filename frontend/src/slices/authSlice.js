import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  //States passados para o Register.js através do useSelector
  //Enquanto a requisição estiver sendo feita, mapear os estados
  user: user ? user : null,
  error: false, //1.1 - Definindo state
  sucess: false,
  loading: false,
};

//Register an user and sign in
export const register = createAsyncThunk(
  "auth/register", //Dando o nome para a função de createAsyncThanks. Padrão ("entidade/ação") Ex: "auth/login". Para depois ser usado no extrareducers
  async (user, thunkAPI) => {
    const data = await authService.register(user);

    //Check for errors
    if (data.errors) {
      // return thunkAPI.rejectWithValue(data.errors[0]); //Pegando o array de errors do backend que fiz. Posso também pegar todos e colocar em seus devidos inputs
      return thunkAPI.rejectWithValue(data.errors); //Pegando o array de errors do backend que fiz. Posso também pegar todos e colocar em seus devidos inputs
    } //1.2 Identificando se tem erros. Vindo da API
    console.log(data);
    return data;
  }
);

//Sign in an user
export const login = createAsyncThunk(
  "auth/login", //Dando o nome para a função de createAsyncThanks. Padrão ("entidade/ação") Ex: "auth/login"
  async (user, thunkAPI) => {
    const data = await authService.login(user);

    //Check for errors
    if (data.errors) {
      console.log(data.errors);
      // return thunkAPI.rejectWithValue(data.errors[0]); //Pegando o array de errors do backend que fiz. Posso também pegar todos e colocar em seus devidos inputs
      return thunkAPI.rejectWithValue(data.errors); //Pegando o array de errors do backend que fiz. Posso também pegar todos e colocar em seus devidos inputs
    } //1.2 Identificando se tem erros. Vindo da API
    console.log(data);
    return data;
  }
);

//Logout an user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout(); //Removendo o token do localStorage
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.sucess = false;
    },
  },
  extraReducers: (builder) => {
    //Register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.sucess = true;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      //1.3 Req rejeitada.
      state.loading = false;
      state.error = action.payload; //1.4 Pegando os erros da API e passando para o estado 1.1
      state.user = null;
    });
    //Logout
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.sucess = true;
      state.error = null;
      state.user = null;
    });
    //Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.sucess = true;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      //1.3 Req rejeitada.
      state.loading = false;
      state.error = action.payload; //1.4 Pegando os erros da API e passando para o estado 1.1
      state.user = null;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

//NOTAS:
/*thunkAPI é um objeto que fornece à função assíncrona criada com createAsyncThunk várias ferramentas úteis do Redux Toolkit, 
como acessar o estado da aplicação, despachar outras ações e personalizar a lógica de tratamento de erros. 
Por exemplo, thunkAPI.getState() para acessar o estado atual da aplicação dentro da função assíncrona e atualizá-lo com os dados da resposta da API. 
thunkAPI.dispatch() para despachar outras ações que atualizam o estado da aplicação com base na resposta da API.
*/
