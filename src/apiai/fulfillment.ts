import * as geocoding from "../google/geocoding";

export let geocodeLocation = (request: any) => {
  const location: string = request.result.resolvedQuery;
  geocoding.geocodeLookup(location, (err: any, res: any) => {
    if (err) {
      throw err;
    } else {
      console.log(res);
      return res;
    }
  });
};
