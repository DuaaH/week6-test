const { Pool } = require("pg");

require("env2")("config.env");
// connectionString
// this will allow us to connect to the database
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("please set a DATABASE_URL env varaiable");
}

module.exports = new Pool({
  connectionString,

  ssl: !connectionString.includes("localhost")
});
