class LoginService {

    usuarioPadrao = {
        email: "admin@admin.com",
        password: "admin",
    };

    fazerLogin(email, password) {
        cy.log(`Fazendo login via API com o usuário ${email}`);
        return cy.request("POST", "/api/login", { email, password }).then(({ status, body }) => {
            expect(status).to.eq(200);
            expect(body.token).to.exist;
            return body;
        });
    }

    // Faz login com o usuário padrão e retorna apenas o id dele
    loginUsuarioPadrao() {
        const { email, password } = this.usuarioPadrao;
        return this.fazerLogin(email, password).then((usuario) => usuario.id);
    }
}

export default new LoginService();
