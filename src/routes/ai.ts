// Module Dependencies
import * as express from "express";
import * as bodyParser from "body-parser";
import * as auth from "basic-auth";

// Create router
const router: express.Router = express.Router();

/**
 * Verify that the request came from Dialogflow by verifying against the username and password
 * from the Dialogflow webhook configuration
 */

function verifyAuth(req: express.Request, res: express.Response, buf: Buffer) {
  const credentials: auth.BasicAuthResult = auth(req);
  if (!credentials || credentials.name !== process.env.AI_USER || credentials.pass !== process.env.AI_PASSWORD) {
    const err = new Error( "Couldn't validate the requestor's credentials." );
    err["status"] = 403;
    throw err;
    }
  }

// Only accept 'application/json' content types
router.use(bodyParser.json({ type: "*/*", verify: verifyAuth}));

// Used by Dialogflow for webhook fulfillment
router.post("/", (req: express.Request, res: express.Response) => {
  const data = req.body;
  console.log(data);
  res.sendStatus(200);
});

export { router };
