// write the query to post the data into Database
const dbConnection = require("../db_connection");
const postData = (name, country, cb) => {
  dbConnection.query(
    `Insert into cities (city_name, country_name) values ($1, $2)`,
    [name, country],
    (error, res) => {
      if (error) {
        return cb(error);
      }
      cb(null, res.rows);
    }
  );
};
module.exports = postData;
