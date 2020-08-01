const app = require("../src/app");
const supertest = require("supertest");
const registerTests = require("./auth/register");
const loginTests = require("./auth/login");
const req = supertest(app);

describe("User registeration", () => registerTests(req));
describe("User login", () => loginTests(req));
