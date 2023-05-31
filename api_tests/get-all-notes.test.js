const { spec, request } = require("pactum");

const baseURL = "https://practice.expandtesting.com/notes/api";

const getNotesSchema = require("../data/response/get-notes-schema.json");

describe("Get all notes test", () => {
  before(() => {
    request.setDefaultTimeout(5000);
    console.log("Starting the execution of the GET ALL NOTE test suite");
  });

  it("Get all notes test", async () => {
    await spec()
      .get(`${baseURL}/notes`)
      .withHeaders(
        "x-auth-token",
        "9b519485bf8840b19bae42c5d919b6e5b5866c6313144a9082d8e87843ad31f7",
        "Content-Type",
        "application/json"
      )
      .expectStatus(200)
      .expectResponseTime(3000)
      .expectBodyContains("Notes successfully displayed")
      .expectJsonSchema(getNotesSchema);
  });
});