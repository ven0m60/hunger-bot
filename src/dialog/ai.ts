import * as apiai from "apiai";
import * as send from "../messenger/send";

const app = apiai(process.env.AI_TOKEN);

export let textRequest = (text: string, sender: string) => {
  const request = app.textRequest(text, {
    sessionId: sender
  });

  request.on("response", (response) => {
    console.log(response);

    const messages: any = response.result.fulfillment.messages.filter(retrieveText);
    const customPayloads: any = response.result.fulfillment.messages.filter(retrieveCustomPayload);

    if (messages.length > 0) {
      send.sendTextMessage(sender, messages[0].speech);
    } else if (customPayloads.length > 0) {
      send.sendCustomMessage(sender, customPayloads[0]);
      } else {
      const err = new Error("Invalid response from AI");
      throw err;
    } else {
      send.sendMessage(sender, message, customPayload);
    }
  });
  request.on("error", (error) => {
  console.log(error);
  });
  request.end();
};

export let retrieveText = (messages: any): any => {
  return messages.type === 0 && !messages.hasOwnProperty("platform") && messages.hasOwnProperty("speech");
};

export let retrieveCustomPayload = (messages: any): any => {
  return messages.type === 4 && !messages.hasOwnProperty("platform") && messages.hasOwnProperty("payload");
};
