export function isMongoEnabled() {
  return (process.env.DATA_SOURCE || "json").toLowerCase() === "mongodb";
}