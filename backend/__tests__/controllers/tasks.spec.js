const request = require("supertest");
const { app } = require("../../src/app.js");

let response;

describe("GET /tasks", () => {
  beforeAll(async () => {
    response = await request(app).get("/tasks");
  });

  test("Should send a status code of 200 and return an empty array when the database is connected and contains no records.", async () => {
    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(0);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("Should send a status code of 200 and return an array with objects contain id, task, isDone fields when the database is connected.", async () => {
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
    for (const element of response.body) {
      expect(element).toHaveProperty("id");
      expect(element).toHaveProperty("task");
      expect(element).toHaveProperty("isDone");
    }
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("Should send a status code of 500 and return proper error message when the database is disconnected.", async () => {
    expect(response.status).toEqual(500);
    expect(response.body.message).toBe(
      "Something has gone wrong. We have internal server error, Please try again later"
    );
  });
});

describe("POST /tasks", () => {
  beforeAll(async () => {
    response = await request(app)
      .post("/tasks")
      .send({ task: "drink water" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);
  });

  test("Should send a status code of 201 and return an object contains id, task, isDone fields when the database is connected", async () => {
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("task");
    expect(response.body).toHaveProperty("isDone");
    expect(typeof response.body).toBe("object");
  });

  test("Should send a status code of 500 and return proper error message when the database is disconnected.", async () => {
    expect(response.status).toEqual(500);
    expect(response.body.message).toBe(
      "Something has gone wrong. We have internal server error, Please try again later"
    );
  });
});

describe("PATCH /tasks/:id/isDone", () => {
  beforeAll(async () => {
    response = await request(app).patch(
      "/tasks/067ac385-4070-11ef-9fbb-24fd52361c78/isDone"
    );
  });

  test.only("Should send a status code of 200 and return an object with id: 067ac385-4070-11ef-9fbb-24fd52361c78 and isDone: true when the database is connected and object with the id exist.", async () => {
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("task");
    expect(response.body).toHaveProperty("isDone", true);
    expect(typeof response.body).toBe("object");
  });

  test("Should send a status code of 500 and return proper error message when the database is disconnected.", async () => {
    expect(response.status).toEqual(500);
    expect(response.body.message).toBe(
      "Something has gone wrong. We have internal server error, Please try again later"
    );
  });
});

describe("PATCH /tasks/:id", () => {
  beforeAll(async () => {
    response = await request(app)
      .patch("/tasks/067ac385-4070-11ef-9fbb-24fd52361c78")
      .send({ task: "drink water" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);
  });
  test('Should send a status code of 200 and return an object with id: 067ac385-4070-11ef-9fbb-24fd52361c78 and task: "drink water" when the database is connected and object with the id exist.', async () => {
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("task");
    expect(response.body).toHaveProperty("isDone");
    expect(typeof response.body).toBe("object");
  });

  test("Should send a status code of 500 and return proper error message when the database is disconnected.", async () => {
    expect(response.status).toEqual(500);
    expect(response.body.message).toBe(
      "Something has gone wrong. We have internal server error, Please try again later"
    );
  });
});

describe("DELETE /tasks/:id", () => {
  beforeAll(async () => {
    response = await request(app).delete(
      "/tasks/067ac385-4070-11ef-9fbb-24fd52361c78"
    );
  });
  test("Should send a status code of 200 and return an object with only id: 067ac385-4070-11ef-9fbb-24fd52361c78 when the database is connected and object with the id exist.", async () => {
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body).toBe("object");
  });

  test("Should send a status code of 500 and return proper error message when the database is disconnected.", async () => {
    expect(response.status).toEqual(500);
    expect(response.body.message).toBe(
      "Something has gone wrong. We have internal server error, Please try again later"
    );
  });
});
