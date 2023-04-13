import request from "supertest";
import { app } from "../../app";

it("responds with details about current user", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toBeDefined();
});

it("responds with null if unauthenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(400)
    .expect({
      errors: [{ message: "Not authorized" }],
    });

  expect(response.body.currentUser).toBeUndefined();
});
