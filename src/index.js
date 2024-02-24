const express = require("express");
const cors = require("cors");

require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

const server = express();

// middleware to parse all data incoming to the server:
server.use(express.json());
server.use(cors());

server.use("/user", userRoutes);

server.listen("3000", () => {
  console.log("listening");
});
