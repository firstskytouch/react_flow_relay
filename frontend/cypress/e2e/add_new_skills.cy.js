describe("new skills spec", () => {
  before(() => {
    cy.visit("http://localhost:3000");
    cy.get("h1").should("contain.text", "Skill List App");
    cy.get("div#skill-list-QXJlYTox").should("contain.text", "Front End");
    cy.get("div#skill-list-QXJlYToy").should("contain.text", "Back End");
  })
  it("add `Javascript` in the front end", () => {
    cy.get("div#skill-list-QXJlYTox").click()
    cy.get("button#btn-add-new-skill").click();
    cy.get(".h4").should("contain.text", "Skill Dialog");
    cy.get('input#inputSkill').type("Javascript")
    cy.get('button#btn-success').click()
    cy.get("div#skill-list-QXJlYTox").should("contain.text", "Javascript");
  });
  it("add `Django` in the back end", () => {
    cy.get("div#skill-list-QXJlYToy").click()
    cy.get("button#btn-add-new-skill").click();
    cy.get(".h4").should("contain.text", "Skill Dialog");
    cy.get('input#inputSkill').type("Django")
    cy.get('button#btn-success').click()
    cy.get("div#skill-list-QXJlYToy").should("contain.text", "Django");
  });
});
