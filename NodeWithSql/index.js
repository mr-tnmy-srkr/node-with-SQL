const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
var methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "college",
  password: "Tanmoy@1993",
});

const getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};
// Home Route
app.get("/", (req, res) => {
  let q = "SELECT count(*) FROM users";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (error) {
    console.log(error);
    res.render("error.ejs");
  }
});
// All users Route
app.get("/users", (req, res) => {
  let q = "SELECT * FROM users";
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      res.render("show_users.ejs", { users });
    });
  } catch (error) {
    console.log(error);
    res.render("error.ejs");
  }
});

//Edit Route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM users WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (error) {
    console.log(error);
    res.render("error.ejs");
  }
});
//Update Route
app.patch("/user/:id", (req, res) => {
  res.send("jj");
});
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
