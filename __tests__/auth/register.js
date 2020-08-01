module.exports = (request, common) => {
  const { username, password } = common.user1;

  test("It should register successfuly", () => {
    return request
      .post("/register")
      .send({
        username,
        password,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);
  });

  test("It should register another user successfuly", () => {
    return request
      .post("/register")
      .send({
        username: common.user2.username,
        password: common.user2.password,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);
  });

  test("It should return error on used username", () => {
    return request
      .post("/register")
      .send({
        username,
        password,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({ errors: ["Username already exist!"] });
      });
  });

  test("It should check min and max range for username and password", () => {
    return request
      .post("/register")
      .send({
        username: "",
        password: "",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .then((res) => {
        expect(res.body.errors).toContainEqual("Invalid value");
      });
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
};
