require("dotenv").config("./.env");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const dbconnect = require("./Config/Conn");
const errormiddleare = require("./Middleware/Error");
const AuthRoute = require("./Routes/Auth-route");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", AuthRoute);
app.use(errormiddleare);
dbconnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
