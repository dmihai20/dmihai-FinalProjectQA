const { spec, request } = require("pactum");

const baseURL = "https://practice.expandtesting.com/notes/api";

describe("Create new notes test suite", () => {
  before(() => {
    request.setDefaultTimeout(5000);
    console.log("Starting the execution of the CREATE NEW NOTE test suite");
  });

  it("create a new note test", async () => {
    const requestBody = {
      title: "QAPractice",
      description: "QAExercise1",
      category: "Work",
    };
    await spec()
      .post(`${baseURL}/notes`)
      .withHeaders(
        "x-auth-token",
        "9b519485bf8840b19bae42c5d919b6e5b5866c6313144a9082d8e87843ad31f7",
        "Content-Type",
        "application/json"
      )
      .withBody(requestBody)
      .expectStatus(200)
      .expectResponseTime(3000)
      .expectBodyContains("Note successfully created");
  });
});