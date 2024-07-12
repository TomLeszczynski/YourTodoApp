const request = require("supertest");
const { app } = require("../../src/app.js");

describe("GET /", () => {
  test("Should send a status code of 303 when the application redirected a user to GET /tasks.", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toEqual(303);
    expect(response.headers.location).toBe("/tasks");
  });
});
