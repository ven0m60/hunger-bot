export let handlePostback = (event: any) => {
  const type: string = JSON.parse(event.postback.payload);
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
  console.log();
};
