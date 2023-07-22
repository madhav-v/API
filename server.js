const http = require("http");
const express = require("express");
const app = express();
const routes = require("./src/routes");
const cors = require("cors");
require("./src/config/mongoose.config");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cors());

app.use("/api/v1", routes);

const server = http.createServer(app);

// 404

app.use((req, res, next) => {
  next({ status: 404, msg: "Not found" });
});
app.use((error, req, res, next) => {
  // TODO: Error handling
  let status = error && error.status ? error.status : 500;
  let msg = error && error.msg ? error.msg : "Internal server error..";
  console.log(error);

  res.status(status).json({
    result: null,
    status: false,
    msg: msg,
    meta: null,
  });
});
server.listen(3005, "localhost", (err) => {
  if (err) {
    console.log("Error listening to port 3005");
  } else {
    console.log("Server is listening to port 3005");
    console.log("Press CTRL+C to disconnect server");
  }
});
