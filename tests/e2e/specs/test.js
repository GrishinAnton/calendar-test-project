const TIMER_VALIDATION = 2000;
const EXAMPLE_TIME_TEST_VALIDATION = [":10", "30:10", "40:", "50:123"];

describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
  });

  it("Add task", () => {
    cy.get("[data-cy='task-items']")
      .children()
      .then(e => {
        let startTasksLength = e.length;

        cy.get("[data-cy='add-task-button']")
          .click()
          .get("[data-cy='input-time']")
          .type("10:10")
          .wait(TIMER_VALIDATION)
          .get("[data-cy='input-text']")
          .type("Test")
          .get("[data-cy='save-task-button']")
          .click()
          .get("[data-cy='task-items']")
          .children()
          .should("have.length", ++startTasksLength);
      });
  });

  it("Time validation", () => {
    cy.get("[data-cy='add-task-button']")
      .click()
      .wrap(EXAMPLE_TIME_TEST_VALIDATION)
      .each(num => {
        return new Cypress.Promise(resolve => {
          cy.get("[data-cy='input-time']")
            .clear()
            .type(num);

          cy.wait(TIMER_VALIDATION);

          cy.get("[data-cy='input-text']").should("be.disabled");
          resolve();
        });
      })
      .get("[data-cy='input-time']")
      .clear()
      .type("00:00")
      .wait(TIMER_VALIDATION)
      .get("[data-cy='input-text']")
      .should("not.be.disabled")
      .get("[data-cy='input-time']")
      .clear()
      .wait(500)
      .type("00:00")
      .get("[data-cy='input-text']")
      .should("be.disabled")
      .wait(TIMER_VALIDATION)
      .should("not.be.disabled");
  });
});
