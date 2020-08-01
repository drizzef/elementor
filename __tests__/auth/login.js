const { username, password } = require("../common");

let token = "";
module.exports = (request) => {
  test("It should login successfuly", () => {
    return request
      .post("/login")
      .send({
        username,
        password,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          token: expect.any(String),
        });
        token = res.body.token;
      });
  });

  test("It should not login", () => {
    return request
      .post("/login")
      .send({
        username: username + "1",
        password,
      })
      .set("Accept", "application/json")
      .expect(401);
  });

  test("It should return bad request while there is just one or none of the fields", () => {
    return request.post("/login").expect(400);
  });

  test("It should check if username and password not exists", () => {
    return request
      .post("/register")
      .send({})
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .then((res) => {
        expect(res.body.errors).toContainEqual("Invalid value");
      });
  });

  test("It should authenticated", () => {
    return request
      .post("/auth")
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          username,
        });
      });
  });

  test("It should not authenticated", () => {
    return request
      .post("/auth")
      .set("Authorization", `Bearer ${token}1`)
      .set("Accept", "application/json")
      .expect(401);
  });
};
