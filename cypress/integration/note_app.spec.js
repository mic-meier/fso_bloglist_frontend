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

  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "Batman", password: "Selina" });
    });

    it("A blog can be created", function () {
      cy.contains("new note").click();
      cy.get("#title").type("Test Blog");
      cy.get("#author").type("Test Author");
      cy.get("#url").type("Test URL");
      cy.get("#submit-button").click();
      cy.contains("Test Blog Test Author");
    });

    describe("and blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Testblog 1",
          author: "Testauthor 1",
          url: "TestURL 1",
        });
        cy.createBlog({
          title: "Testblog 2",
          author: "Testauthor 2",
          url: "TestURL 2",
        });
        cy.createBlog({
          title: "Testblog 3",
          author: "Testauthor 3",
          url: "TestURL 3",
        });
      });

      it("a blog can be liked", function () {
        cy.contains("Testblog 2 Testauthor 2").contains("view").click();
        cy.contains("like").click();
        cy.contains("1 likes");
      });

      it("a blog can be deleted by the user", function () {
        cy.contains("Testblog 3 Testauthor 3").contains("view").click();
        cy.contains("delete").click();
        cy.get("html").should("not.contain", "Testblog 3 Testauthor 3");
      });
    });
  });
});
