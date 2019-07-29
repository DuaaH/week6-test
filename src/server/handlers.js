const { readFile } = require("fs");
const path = require("path");
const getData = require("../database/queries/getData");
const postData = require("../database/queries/postData");
const queryString = require("querystring");

const serverError = (err, response) => {
  response.writeHead(500, "Content-Type:text/html");
  response.end("<h1>Sorry, there was a problem loading the homepage</h1>");
  console.log(err);
};

const homeHandler = response => {
  const filepath = path.join(__dirname, "..", "..", "public", "index.html");
  readFile(filepath, (err, file) => {
    if (err) return serverError(err, response);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(file);
  });
};

const getCitiesHandler = response => {
  // write your own function that gets data from your database and response with  the result
  getData((err, res) => {
    if (err) {
      return err;
    }
    response.writeHead(200, {
      "Content-Type": "application/json"
    });
    //  console.log("result", res);

    response.end(JSON.stringify(res));
  });
};

const postCityHandler = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    const result = queryString.parse(data);
    postData(result.name, result.country, err => {
      if (err) {
        response.writeHead(500, {
          "Content-Type": "text/html"
        });
        response.end("<h1>Server Error</h1>");
      }
      response.writeHead(302, { Location: "/" });
      response.end();
    });
  });
};

const publicHandler = (url, response) => {
  const filepath = path.join(__dirname, "..", "..", url);
  readFile(filepath, (err, file) => {
    if (err) return serverError(err, response);
    const extension = url.split(".")[1];
    const extensionType = {
      html: "text/html",
      css: "text/css"
    };
    response.writeHead(200, { "content-type": extensionType[extension] });
    response.end(file);
  });
};

const errorHandler = response => {
  response.writeHead(404, { "content-type": "text/html" });
  response.end("<h1>404 Page Requested Cannot be Found</h1>");
};

module.exports = {
  homeHandler,
  getCitiesHandler,
  postCityHandler,
  publicHandler,
  errorHandler
};
