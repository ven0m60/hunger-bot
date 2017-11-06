/**
 * handlePostback - Postback event handler triggered by a postback
 */

export let handlePostback = (event: any) => {
  const type: any = JSON.parse(event.postback.payload);
  const senderId: string = event.sender.id;

  switch (type) {
    case "GET_STARTED":
       console.log("TO_DO");
       break;
    default:
       console.log("Unknown Postback");
       break;
  }
};

export let handleMessage = (event: any) => {
  const message: any = event.message;
  const senderId: string = event.sender.id;

  // send.sendReadReceipt(senderId);

  if (message.text) {
    console.log("TO_DO");
  }
};
