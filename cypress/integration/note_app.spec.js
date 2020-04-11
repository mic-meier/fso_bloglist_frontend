describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "Batman",
      name: "Bruce Wayne",
      password: "Selina",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username-input").type("Batman");
      cy.get("#password-input").type("Selina");
      cy.get("#login-button").click();
      cy.contains("Logged in as: Batman");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username-input").type("Robin");
      cy.get("#password-input").type("Pamela");
      cy.get("#login-button").click();
      cy.get(".error")
        .should("contain", "Incorrect credentials")
        .and("have.css", "border-style", "solid")
        .and("have.css", "color", "rgb(176, 0, 32)");
    });
  });
});
