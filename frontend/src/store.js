import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  //Salvando todos os contextos
  reducer: { auth: authReducer },
});

// NOTAS:

/*Dinâmica do Redux:
Pasta services: Responsável por criar os contextos para cada serviço a ser criado. Serviços que lidam com o backend
Pasta slice: Ações a serem executadas, basedas nas ações em 'serviço'. Monitoramente dos estados de acordo com as repostas/interações da pasta services. Ex: Ação de registro, disparando vários estados. Baseados nas respostas da API
Arquivo Store.js: Arquivo único que importam todos os menores contexts, criados a partir de um context maior.
*/
