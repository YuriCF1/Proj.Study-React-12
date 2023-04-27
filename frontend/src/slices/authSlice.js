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

/*NOTAS: CreateAsyncThunk
Syntax: createAsyncThunk(typePrefix, payloadCreator, options?)

Onde:
- typePrefix é uma string que será utilizada para gerar os action types associados a esse thunk
- payloadCreator é uma função assíncrona que retorna uma Promise, responsável por fazer a lógica do thunk e retornar o payload.
- options (opcional) é um objeto com configurações extras para o createAsyncThunk, como condition, dispatchConditionRejected, extraReducers, entre outros.

O options é um objeto que pode ser passado como o terceiro argumento para createAsyncThunk. 
Ele permite configurar o comportamento de várias opções do createAsyncThunk, 
incluindo a forma como as funções fulfilled e rejected são tratadas.
Aqui está um exemplo de como usar options para configurar a funcionalidade do createAsyncThunk:

Exemplo:

import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (userId, thunkAPI) => {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error("Error fetching user by id");
    }
    return response.json();
  },
  {
    condition: (userId, { getState }) => {
      const { users } = getState();
      const user = users.entities[userId];
      if (user && user.loaded) {
        // Don't fetch the user if we already have it and it's loaded
        return false;
      }
    },
    dispatchConditionRejection: true,
    extraReducers: (builder) => {
      builder.addCase(fetchUserById.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.entities[action.payload.id] = action.payload;
      });
      builder.addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    },
  }
);

Neste exemplo, o objeto options é usado para configurar o seguinte:

- condition: uma função que determina se a operação de busca deve ser executada. Esta função é chamada antes que a ação seja enviada à API. 
Se ela retornar false, a operação de busca será ignorada e a ação fulfilled não será chamada. 
Neste caso, a função condition usa o estado atual para verificar se já possuímos as informações do usuário e, 
se for esse o caso, não faz outra chamada à API.

- dispatchConditionRejection: se for definido como true, um objeto rejected será despachado com o tipo de ação 
<thunkPrefix>/rejectedCondition se a função condition retornar false. Se definido como false (padrão), a ação não será despachada.

- extraReducers: uma função que permite adicionar casos extras ao createSlice. Neste exemplo, adicionamos casos extras para manipular as ações pending, fulfilled e rejected.
Esses são apenas alguns exemplos de como usar o objeto options. Ele também oferece outras opções, como fulfilledSuffix, rejectedSuffix, serializeError, meta e outros.

*/
