import "mocha";
import * as chai from "chai";
import { v4 as uuid } from "uuid";
import chaiHttp = require("chai-http");

const should = chai.should();

chai.use(chaiHttp);

describe("Dialogflow Webhook Routes", () => {
  let server: any;
  beforeEach(() => {
    // Clears the cache so a new server instance is used for each test
    delete require.cache[require.resolve("../../src/server")];
    server = require("../../src/server").server;
  });
  afterEach((done) => {
    server.close(done);
  });
    describe("POST /webhook-ai", () => {
      it("Unauthorized request to Dialogflow Fulfilment Webhook", (done) => {
        chai.request(server)
          .post("/webhook-ai")
          .set("Content-Type", "application/json")
          .end((err, res) => {
            res.should.have.status(403);
            done();
            });
      });

      it("Authorized request to Dialogflow Fulfilment Webhook with No Action", (done) => {
        chai.request(server)
          .post("/webhook-ai")
          .set("Content-Type", "application/json")
          .send({ result: {noAction: ""}})
          .auth(process.env.AI_USER, process.env.AI_PASSWORD)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });

      it("Authorized request to Dialogflow Fulfilment Webhook with Unknown Action", (done) => {
        chai.request(server)
          .post("/webhook-ai")
          .set("Content-Type", "application/json")
          .auth(process.env.AI_USER, process.env.AI_PASSWORD)
          .send({ result: {action: "unknown-action"}})
          .end((err, res) => {
            res.should.have.status(422);
            done();
          });
      });

      it("Authorized request to Dialogflow Fulfilment Webhook with geocode-location Action", (done) => {
        chai.request(server)
          .post("/webhook-ai")
          .set("Content-Type", "application/json")
          .auth(process.env.AI_USER, process.env.AI_PASSWORD)
          .send({ result: {action: "geocode-location", resolvedQuery: "Ivanhoe"}})
          .end((err, res) => {
            res.should.have.status(200);
            console.log(res.body);
            done();
          });
      });
    });
});
