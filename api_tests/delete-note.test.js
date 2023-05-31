const { spec, request } = require("pactum");
const { faker } = require("@faker-js/faker");

const baseURL = "https://practice.expandtesting.com/notes/api";

const newPassword = faker.internet.password();
const newLastName = faker.person.lastName();
const newFirstName = faker.person.firstName();

const newUsername = faker.internet.userName({
  firstName: newFirstName,
  lastName: newLastName,
});

let authToken = " ";

const newEmail = faker.internet.email();

describe("Delete Note Test", () => {
  before(async () => {
    request.setDefaultTimeout(5000);
    console.log(
      "Starting the execution of the DELETE Notes endpoint test suite"
    );

    registerRequestBody = {
      name: `${newUsername}`,
      email: `${newEmail}`,
      password: `${newPassword}`,
    };

    await spec()
      .post(`${baseURL}/users/register`)
      .withHeaders("Content-Type", "application/json")
      .withBody(registerRequestBody)
      .expectBodyContains("User account created successfully")
      .expectStatus(201);

    loginRequestBody = {
      email: `${newEmail}`,
      password: `${newPassword}`,
    };

    let login = await spec()
      .post(`${baseURL}/users/login`)
      .withHeaders("Content-Type", "application/json")
      .withBody(loginRequestBody)
      .expectBodyContains("Login successful")
      .expectStatus(200);

    authToken = login.body.data.token;

    newNoteRequestBody = {
      title: "TestingTitle",
      description: "Testing1234!",
      category: "Work",
    };

    let newNote = await spec()
      .post(`${baseURL}/notes`)
      .withHeaders({
        "x-auth-token": `${authToken}`,
        "Content-Type": "application/json",
      })
      .withBody(newNoteRequestBody)
      .expectBodyContains("Note successfully created")
      .expectStatus(200);

    createdNote = newNote.body.data.id;
  });

  it("Delete the previosuly created note test case", async () => {
    requestBody = {
      title: "Testing",
      description: "TestingModule",
      category: "Practice",
    };

    await spec()
      .delete(`${baseURL}/notes/${createdNote}`)
      .withHeaders({
        "x-auth-token": `${authToken}`,
        "Content-Type": "application/json",
      })
      .expectBodyContains("Note successfully deleted")
      .expectStatus(200);
  });
});
