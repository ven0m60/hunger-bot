import * as request from "request";

export let geocodeLookup = (location: string, callback: any): void => {
  const host: string = "https://maps.googleapis.com/maps/api";
  const address: string = location;
  const apiKey: string = process.env.GOOGLE_TOKEN;
  const region: string = "au";
  const url: string = host + "/geocode/json?address=" + address + "&key=" + apiKey + "&region=" + region;
  let err: Error = undefined;
  let json: any = undefined;

  request.get(url, (error, res, body): void => {
    if (error) {
      err = new Error("google.geocoding.geocodeLookup Error: " + error);
      err["status"] = 500;
    } else if (res.statusCode != 200) {
      err = new Error("google.geocoding.geocodeLookup Error: " + body);
      err["status"] = 500;
    }
     else {
      json = JSON.parse(body).results;
    }
    callback(err, json);
  });

};
