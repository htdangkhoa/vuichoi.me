import axios from "axios";

export const GOOGLE_API_KEY = "AIzaSyAn6Yh_RWK_E-UKs7UJpsAdD3eUTiocaVU";

const key = GOOGLE_API_KEY;

const instance = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/",
  params: {
    key
  }
});

export const onPlaceAutoComplete = async input =>
  instance.get("/place/autocomplete/json", {
    params: {
      input
    }
  });

export const onDirections = async (origin, destination, waypoints = []) => {
  const midWayPoints = "";

  if (waypoints.length !== 0) {
    midWayPoints = "optimize:true";

    for (let i = 0; i < waypoints.length; i++) {
      midWayPoints += `|${waypoints[i]}`;
    }
  }

  return instance.get("/directions/json", {
    params: {
      origin: `place_id:${origin}`,
      destination: `place_id:${destination}`,
      waypoints: midWayPoints
    }
  });
};
