// write the query to get the data from Database

const dbConnection = require("../db_connection");

const getData = cb => {
  dbConnection.query(
    "select city_name, country_name from cities",
    (err, res) => {
      if (err) {
        return cb(err);
      }
      cb(null, res.rows);
    }
  );
};

module.exports = getData;
