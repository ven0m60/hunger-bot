import * as ai from "../dialog/ai";
import * as send from "./send";

 // handlePostback - Postback event handler triggered by a POST to Messenger webhook

export let handlePostback = (event: any) => {
  const type: string = JSON.parse(event.postback.payload);
  const senderId: string = event.sender.id;
  switch (type) {
    case "GET_STARTED":
       ai.textRequest(type, senderId);
       break;
    default:
       console.log("Unknown Postback: ", event);
       break;
  }
};

// handleMessage - Message event handler triggered by a POST to Messenger webhook

export let handleMessage = (event: any) => {
  const message: any = event.message;
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
    for (let attachment of message.attachments) {
 // Location Payload
      if (message.attachments[attachment].type === "location") {
        text = "lat:" + message.attachments[attachment].payload.coordinates.lat
        + ", lon:" + message.attachments[attachment].payload.coordinates.long;
        ai.textRequest(text, senderId);
      }
 // Multimedia Attachment
      else {
        text = "UNKNOWN_ATTACHMENT";
        console.log("TO_DO");
      }
       ai.textRequest(text, senderId);
    }
  }
};
