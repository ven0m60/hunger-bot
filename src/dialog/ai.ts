import * as apiai from "apiai";

const app = apiai(process.env.AI_TOKEN);

export let textRequest = (text: string, sender: string) => {
  const request = app.textRequest(text, {
    sessionId: sender
  });
  request.on("response", (response) => {
    console.log(response);
    const aiText = response.result.fulfillment.speech;
    console.log("TO_DO");
  });
  request.on("error", (error) => {
  console.log(error);
  });
  request.end();
};
