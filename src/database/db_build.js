const fs = require("fs");

const dbConnection = require("./db_connection.js");

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

dbConnection.query(sql, (err, res) => {
  if (err) throw err;
  console.log("football teams table created with result: ", res);
});
