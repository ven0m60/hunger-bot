import * as request from "request";

const FB_TOKEN = process.env.FB_TOKEN;

// Turns typing indicator on
export let typingOn = (recipientId: string) => {
  const payload = {
    messaging_type: "RESPONSE",
    recipient: {
      id: recipientId,
    },
    sender_action: "typing_on",
  };
  callAPI(payload);
};

// Turns typing indicator off
export let typingOff = (recipientId: string) => {
  const payload = {
    messaging_type: "RESPONSE",
    recipient: {
      id: recipientId,
    },
    sender_action: "typing_off",
  };
  callAPI(payload);
};

// Send read receipt to indicate the message has been read
export let sendReadReceipt = (recipientId: string) => {
  const payload = {
    messaging_type: "RESPONSE",
    recipient: {
      id: recipientId,
    },
    sender_action: "mark_seen",
  };
  callAPI(payload);
};

// Send message using the Send API
export let sendTextMessage = (recipientId: string, messageBody: string) => {
  const payload: any = {
      messaging_type: "RESPONSE",
      recipient: {
        id: recipientId,
      },
      message: {
        text: messageBody,
      },
    };
  callAPI(payload);
};

export let sendCustomMessage = (recipientId: string, messageBody: any) => {
  const payload: any = {
    messaging_type: "RESPONSE",
    recipient: {
      id: recipientId,
    },
    message: messageBody,
  };
  callAPI(payload);
};

// Facebook Send API
export let callAPI = (messageData: any) => {
  request({
    uri: "https://graph.facebook.com/v2.6/me/messages",
    qs: { access_token: FB_TOKEN },
    method: "POST",
    json: messageData,
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log("Message successfully sent to Facebook");
    } else {
      throw error;
    }
  });
};
