import * as geocoding from "../google/geocoding";

export let geocodeLocation = (request: any, callback: any) => {
  const location: string = request.result.resolvedQuery;
  geocoding.geocodeLookup(location, (err: Error, res: any) => {
    if (err) {
      callback(err, undefined);
    } else {
      callback(undefined, res);
    }
  });
};
