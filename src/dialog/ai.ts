import * as apiai from "apiai";
import * as send from "../messenger/send";

const app = apiai(process.env.AI_TOKEN);

export let textRequest = (text: string, sender: string) => {
  send.typingOn(sender);
  const request = app.textRequest(text, {
    sessionId: sender
  });
  request.on("response", (response) => {
    console.log(response);
    const message: string = response.result.fulfillment.messages.filter(retrieveText);
    const customPayload: any = response.result.fulfillment.messages.filter(retrieveCustomPayload);
    if (!message && !customPayload) {
      const err = new Error("Invalid response from AI");
      throw err;
    } else {
      send.sendMessage(sender, message, customPayload);
    }
  });
  request.on("error", (error) => {
  console.log(error);
  });
  send.typingOff(sender);
  request.end();
};

export let retrieveText = (messages: any): string => {
  const text: any = messages.type === 0 && !messages.hasOwnProperty("platform") && messages.hasOwnProperty("speech");
  console.log("text: ", text.length);
  if (text.length <= 1) {
    return text[0].speech;
  } else {
    const err = new Error("Invalid response from AI");
    throw err;
  }
};

export let retrieveCustomPayload = (messages: any): any => {
  const payloadBody: any = messages.type === 4 && !messages.hasOwnProperty("platform") && messages.hasOwnProperty("payload");
  if (payloadBody.length <= 1) {
    return payloadBody[0].payload;
  } else {
    const err = new Error("Invalid response from AI");
    throw err;
  }
};
