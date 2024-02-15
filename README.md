# Reactgram

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui--->
## Sobre
Site elaborado para estudo de MongoDB e interação do mesmo com o React<br>

## Descrição
Evoluindo o projeto anterior de MiniBlog, desta vez utilizando o modelo do Instagram. No projeto, o usuário pode criar contas, postar fotos, comentar, curir, buscar fotos por títulos e mais.

### Detalhes
Um grande aprendizado do projeto foi lidar com quisitos de segurança como a liberação de determinados IP's para conexões com o banco de dados e também lidar com a política CORS. A utilização do Redux, bem como as funções assíncronas, foram de grande aprendizado e interesse no projeto inteiro.

<div id='comeco'>
 </div>

## Linguagens e Frameworks
- HTML
- CSS
- JavaScript
- React
- MongoDB
- NodeJS
- Express
  <br/>
Para mais detalhes, clique [aqui](#backend)

### Deploy do projeto: https://reactgram-frontend-yurifdev-x4zd.onrender.com/login

<img src="https://raw.githubusercontent.com/YuriCF1/Proj.Study-React-12/main/Readme%20Example.png" alt="imagem do site">

### Ajustes e melhorias

Visto a complexidade do projeto, ele está aberto para melhorias futuras conforme aprendizados a serem adquiridos

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://www.linkedin.com/in/yf19/">
        <img src="https://github.com/YuriCF1/YuriCF1/blob/main/99689063.jpg" width="100px;" alt="Foto do Yuri Cruz no GitHub"/><br>
        <sub>
          <b>Yuri Cruz</b>
        </sub>
      </a>
    </td>
 
</table>


## 📝 Licença

Esse projeto está sob licença. Todos os direitos autorais reservados.

[⬆ Voltar ao topo](#comeco)<br>

<!-- COISAS PARA FAZER -->
<!-- Fazer o retorno da home caso token expire V-->
<!-- DELETAR LIKE V-->
<!-- HOOK PARA LIKE DE FOTO, PHOTOITEM E HOME -->
<!-- Componentizar o loading? if(loading) {return Carregando...} -->
<!-- Componentizar a o map de photo na Home e Search, e fotos zeradas-->
<!-- DELETAR COMENTÁRIO -->
# Para mais detalhes

## O projeto foi iniciado baixando os pacotes do npm

<div id='backend'>
 </div>

## Backend 💽

#### Utilizando o comando: npm install bcryptjs cors dotenv express express-validatenor jsonwebtoken mongoose multer

</br>
bcryptjs = Biblioteca para manipular senhas do usuário; </br>
cors = Receber requisições da mesma origem; </br>
dotenv = Salvar as variáveis do ambiente. Ex: Domínio do banco de dados a ser resgato em outro lugar; </br>
express = Framework backend para criar a API; </br>
express-validator = Trabalhar entre as requisições para validar dados. Se encarregar da validação, em vez dos controllers, no modelo MVC; </br>
jsonwebtoken = Gerar e verificar os tokens para autenticar o usuário e deixar o token ativo; </br>
mongoose = Ferramente para trabalhar com banco de dados; </br>
multer = Pacote para trabalhar com upload de imagens, tanto foto e foto de perfils; </br>

#### npm i --save-dev nodemon
nodemon = Ferramente de desenvolvimento. Que reinicializa o servidor quando algo é alterado e salvo

## Frontend 🖥️

#### Utilizando o comando: npm i react-icones react-router-dom @reduxjs/toolkit

</br>
npm i react-icones = Pegar ícones
react-router-dom = Navegação entre as páginas
react-redux = Instalando redux
@reduxjs/toolkit = Manipalçao de estado mais limap

<!--
[v] - Backend
[v] - Frontend iniciado recentemente
[v] - Resolvendo bug do curso, desfazendo autentificação após expiração do token
-->
