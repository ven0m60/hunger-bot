import * as ai from "../apiai/messaging";
import * as send from "./send";

 // handlePostback - Postback event handler triggered by a POST to Messenger webhook

export let handlePostback = (event: any) => {
  const type: string = event.postback.payload;
  const senderId: string = event.sender.id;
  switch (type) {
    case "GET_STARTED":
      const aiEvent = {name: type};
       ai.eventRequest(aiEvent, senderId);
       break;
    default:
       console.log("Unknown Postback: ", event);
       break;
  }
};

// handleMessage - Message event handler triggered by a POST to Messenger webhook

export let handleMessage = (event: any) => {
  const message: any = event.message;
  console.log(JSON.stringify(message, undefined, 4));
  let text: string = undefined;
  const senderId: string = event.sender.id;

  send.sendReadReceipt(senderId);

 // Plain text message
  if (message.text) {
    text = message.text;
     ai.textRequest(text, senderId);
  }
 // Quick Replies
    else if (message.quick_reply) {
    text = message.quick_reply.payload;
     ai.textRequest(text, senderId);
  }
 // Attachments
    else if (message.attachments) {
    for (const attachment of message.attachments) {
 // Location Payload
      if (attachment.type === "location") {
        const aiEvent = {
          name: "LOCATION",
          data: {
            latitude: attachment.payload.coordinates.lat,
            longitude: attachment.payload.coordinates.long
          }
        };
        ai.eventRequest(aiEvent, senderId);
      }
 // Multimedia Attachment
      else {
        text = "UNKNOWN_ATTACHMENT";
        ai.textRequest(text, senderId);
      }
    }
  }
};
