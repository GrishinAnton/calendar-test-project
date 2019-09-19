// https://docs.cypress.io/api/introduction/api.html
// 1. Написать тест на Cypress, проверяющий корректность механизма добавления задачи
// 2. Тест, проверяющий корректность работы валидации поля времени

describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
  });

  it("Add task", () => {
    cy.get("[data-cy='task-items']")
      .children()
      .then(e => {
        let startLength = e.length;

        cy.get("[data-cy='add-task-button']")
          .click()
          .get("[data-cy='input-time']")
          .type("10:10")
          .wait(2500)
          .get("[data-cy='input-text']")
          .type("Test")
          .get("[data-cy='save-task-button']")
          .click()
          .get("[data-cy='task-items']")
          .children()
          .should("have.length", ++startLength);
      });
  });

  it("Time validation", () => {
    cy.get("[data-cy='add-task-button']").click();

    cy.wrap([":10", "30:10", "40:", "50:123"]).each(num => {
      return new Cypress.Promise(resolve => {
        cy.get("[data-cy='input-time']").clear();
        cy.get("[data-cy='input-time']").type(num);

        cy.wait(2500);

        cy.get("[data-cy='input-text']").should("be.disabled");
        resolve();
      });
    });
    cy.get("[data-cy='input-time']").clear();
    cy.get("[data-cy='input-time']").type("00:00");

    cy.wait(2500);

    cy.get("[data-cy='input-text']").should("not.be.disabled");

    cy.get("[data-cy='input-time']").clear();
    cy.wait(500);
    cy.get("[data-cy='input-time']").type("00:00");

    cy.wait(2500);

    cy.get("[data-cy='input-text']").should("not.be.disabled");
  });
});
