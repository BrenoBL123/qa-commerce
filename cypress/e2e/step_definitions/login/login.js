import { Given as Dado, When as Quando, Then as Entao } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../../pages/LoginPage";
import DashBoardPage from "../../../pages/DashboardPage";

Dado("que o cliente está na página de login", () => {
    LoginPage.acessarLogin();
});

Quando("o cliente faz login com e-mail e senha válidos", () => {
    LoginPage.fazerLogin("teste@teste.com", "Teste@123");
});

Entao("o cliente deve ser direcionado para a área logada", () => {
    DashBoardPage.validarPaginaAtual();
});

Entao("deve ser exibida a identificação do cliente logado", () => {
    DashBoardPage.validarNomeUsuarioLogado("teste teste");
});



