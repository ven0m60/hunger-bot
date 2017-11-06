import "mocha";
import * as chai from "chai";
import { v4 as uuid } from "uuid";
import chaiHttp = require("chai-http");

const should = chai.should();

chai.use(chaiHttp);

describe("Messenger Routes", () => {
  let server: any;
  beforeEach(() => {
    // Clears the cache so a new server instance is used for each test
    delete require.cache[require.resolve("../../src/server")];
    server = require("../../src/server").server;
  });
  afterEach((done) => {
    server.close(done);
  });
    describe("GET /messenger", () => {
      it("Unauthorized subscription to callback URL", (done) => {
        chai.request(server)
          .get("/messenger")
          .end((err, res) => {
            res.should.have.status(403);
            done();
            });
      });

    const id: string = uuid();

      it("Authorized subscription to callback URL", (done) => {
        chai.request(server)
          .get("/messenger")
          .query({ "hub.verify_token": process.env.FB_VERIFY_TOKEN, "hub.mode": "subscribe", "hub.challenge": id})
          .end((err, res) => {
            res.should.have.status(200);
            res.text.should.be.equal(id);
            done();
          });
      });
    });
});
