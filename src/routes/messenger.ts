// Module Dependencies
import * as express from "express";
import * as bodyParser from "body-parser";
import * as crypto from "crypto";
import * as receive from "../messenger/receive";

// Create router
const router: express.Router = express.Router();

/**
 * Verify that the callback came from Facebook. Using the App Secret from
 * the App Dashboard, we can verify the signature that is sent with each
 * callback in the x-hub-signature field, located in the header.
 */
function verifyRequestSignature(req: express.Request, res: express.Response, buf: Buffer) {
  const signature: string = req.get("x-hub-signature");

  if (!signature) {
    console.error("Couldn't validate the signature");
/**
 * In production use:
 * const err = new Error("Signature not present in the request");
 * err["status"] = 401;
 * throw err;
 */
  } else {
    const elements = signature.split("=");
    const signatureHash = elements[1];

    const expectedHash = crypto.createHmac("sha1", process.env.FB_SECRET)
      .update(buf)
      .digest("hex");

    if (signatureHash !== expectedHash) {
      const err = new Error( "Couldn't validate the request signature." );
      err["status"] = 403;
      throw err;
    }
  }
}

// Only accept 'application/json' content types

router.use(bodyParser.json({ type: "*/*", verify: verifyRequestSignature }));

// Used by Facebook to verify the correct webhook location for the application

router.get("/", (req: express.Request, res: express.Response) => {
  if (
    req.query["hub.verify_token"] === process.env.FB_VERIFY_TOKEN &&
    req.query["hub.mode"] === "subscribe"
  ) {
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    const err = new Error( "Token could not be verified" );
    err["status"] = 403;
    throw err;
  }
});


// Used by Facebook to send interactions to the application
router.post("/", (req: express.Request, res: express.Response) => {
  const data = req.body;
  if (data.object === "page") {
    /**
     * Send status back to Facebook so that duplicate messages are not
     * received in the event that a request takes a while to process
     */
    res.sendStatus(200);
    data.entry.forEach((pageEntry: any) => {
      pageEntry.messaging.forEach((messagingEvent: any) => {
        console.log({ messagingEvent });
        if (messagingEvent.message) {
          receive.handleMessage(messagingEvent);
        } else if (messagingEvent.postback) {
          receive.handlePostback(messagingEvent);
        } else {
          console.log(
            "Webhook received unknown messagingEvent: ",
            messagingEvent
          );
        }
      });
    });
  } else {
    const err = new Error("Invalid request structure");
    err["status"] = 422;
    throw err;
  }
});

export { router };
