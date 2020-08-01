expect.extend({
  toBeTypeOrNull(received, argument) {
    if (received === null) {
      return {
        message: () => `Ok`,
        pass: true,
      };
    }
    const pass = expect(received).toEqual(expect.any(argument));
    if (pass) {
      return {
        message: () => `Ok`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be ${argument} type or null`,
        pass: false,
      };
    }
  },
});

module.exports = (request, common) => {
  let userId = 1;
  test("It should get all users", () => {
    return request
      .get("/users")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${common.user1.token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              ip_v4_address: expect.any(String),
              updated_at: expect.any(String),
              last_login_at: expect.toBeTypeOrNull(String),
              login_at: expect.any(String),
              username: expect.any(String),
              id: expect.any(Number),
            }),
          ])
        );
        expect(res.body.data.length >= 2).toBeTruthy();
        userId = res.body.data[0].id;
      });
  });

  test("It should get one user", () => {
    return request
      .get(`/users/${userId}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${common.user1.token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          data: expect.objectContaining({
            loginsCount: expect.any(Number),
            register_at: expect.any(String),
            user_agent: expect.any(String),
          }),
        });
      });
  });

  describe("Check when user logout and remove from the list", () => {
    test("It should logout user", () => {
      return request
        .post(`/logout`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${common.user1.token}`)
        .expect(200);
    });

    test("It should display one user in the list", () => {
      return request
        .get("/users")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${common.user2.token}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body.data).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                ip_v4_address: expect.any(String),
                updated_at: expect.any(String),
                last_login_at: expect.toBeTypeOrNull(String),
                login_at: expect.any(String),
                username: expect.any(String),
                id: expect.any(Number),
              }),
            ])
          );
          expect(
            res.body.data.some((x) => x.username === common.user1.username)
          ).toBeFalsy();
        });
    });
  });
};
