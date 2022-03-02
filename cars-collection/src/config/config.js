export const CARS_COLLECTION_URL =
  process.env.NODE_ENV && process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://cars-collection.herokuapp.com";
