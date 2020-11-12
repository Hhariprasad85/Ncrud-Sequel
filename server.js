const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
const db = require("./models");
// routes 
const posts = require("./routes/posts");
const users = require("./routes/users");

const corsSettings = {
  originL: "http://localhost:3000"
};


// enable cors
server.use(cors(corsSettings));
// Parse request of content-type - application/json
server.use(bodyParser.json());
// parse requests of content-type -application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));

// using routes
server.use("/", posts);
server.use("/", users);

// set listening ports for request
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
// Run following function if you want drop existing tables and re-sync database
// db.dropRestApiTable();
db.databaseConf.sync();
