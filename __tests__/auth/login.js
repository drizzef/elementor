module.exports = (request, common) => {
  test("It should login successfuly", () => {
    return request
      .post("/login")
      .send({
        username: common.user1.username,
        password: common.user1.password,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          token: expect.any(String),
        });
        common.user1.token = res.body.token;
      });
  });

  test("It should login another user successfuly", () => {
    return request
      .post("/login")
      .send({
        username: common.user2.username,
        password: common.user2.password,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          token: expect.any(String),
        });
        common.user2.token = res.body.token;
      });
  });

  test("It should not login", () => {
    return request
      .post("/login")
      .send({
        username: "a",
        password: "b",
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
      .set("Authorization", `Bearer ${common.user1.token}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          username: common.user1.username,
        });
      });
  });

  test("It should not authenticated", () => {
    return request
      .post("/auth")
      .set("Authorization", `Bearer ${common.user1.token}1`)
      .set("Accept", "application/json")
      .expect(401);
  });
};
