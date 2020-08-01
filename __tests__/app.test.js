/**
 * Note: making it sequential and reuse the same app context I preffered using this method.
 * @see https://github.com/facebook/jest/issues/6194#issuecomment-419837314
 */
const app = require("../src/app");
const supertest = require("supertest");

const registerTests = require("./auth/register");
const loginTests = require("./auth/login");
const usersTests = require("./users/users");
const { UserService } = require("../src/dal/services");
const req = supertest(app);
const faker = require("faker");

const common = {
  user1: {
    username: faker.internet.userName(),
    password: faker.internet.password(10),
    token: "",
  },
  user2: {
    username: faker.internet.userName(),
    password: faker.internet.password(10),
    token: "",
  },
};

afterAll(() => {
  // Remove the users from the database
  UserService.delete(common.user1.username);
  UserService.delete(common.user2.username);
});

describe("User registeration", () => registerTests(req, common));
describe("User login", () => loginTests(req, common));
describe("User endpoints", () => usersTests(req, common));
