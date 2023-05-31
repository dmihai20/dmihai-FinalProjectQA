const { spec } = require("pactum");
const { faker } = require("@faker-js/faker");

const baseURL = "https://practice.expandtesting.com/notes/api";

const randomName = faker.person.firstName();
const randomPassword = faker.internet.password();
const randomEmail = faker.internet.email();

 it("Create new user test", async () => {
    const requestBody = {
        name: `${randomName}`,
        email: `${randomEmail}`,
        password: `${randomPassword}`,
    };
    await spec()
      .post(`${baseURL}/users/register`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectStatus(201)
      .expectResponseTime(3000)
      .expectBodyContains("User account created");
  });

  it("Login User Test", async () => {
    const requestBody = {
        name: `${randomName}`,
      email: `${randomEmail}`,
      password: `${randomPassword}`,
    };

    await spec()
      .post(`${baseURL}/users/login`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectBodyContains("Login successful")
      .expectStatus(200);
  });
