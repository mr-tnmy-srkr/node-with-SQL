const express = require("express");

const app = express();
const port = 8080;
const { uuid } = require("uuidv4");
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
    connection.query(q, (error, result) => {
      if (error) throw error;
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
    connection.query(q, (error, users) => {
      if (error) throw error;
      res.render("show_users.ejs", { users });
    });
  } catch (error) {
    console.log(error);
    res.render("error.ejs");
  }
});
//Add user Route
app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});
//Add a user to DB
app.post("/user", (req, res) => {
  const { username, email, password } = req.body;
  const id = uuid();
  let q = `INSERT INTO users (id,username,email,password) VALUES (?,?,?,?)`;
  let data = [id, username, email, password];

  try {
    connection.query(q, data, (error, result) => {
      if (error) throw error;
      res.redirect("/users");
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
    connection.query(q, (error, result) => {
      if (error) throw error;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (error) {
    console.log(error);
    res.render("error.ejs");
  }
});
//Update to DB
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPass, username: newUserName } = req.body;
  let q1 = `SELECT * FROM users WHERE id = '${id}'`;
  try {
    connection.query(q1, (error, result) => {
      if (error) throw error;
      let user = result[0];
      if (formPass != user.password) {
        res.send("Wrong Password");
      } else {
        let q2 = `UPDATE users SET username = '${newUserName}' WHERE id = '${id}'`;
        connection.query(q2, (err, result) => {
          if (error) throw error;
          // res.send(result);
          res.redirect("/users");
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.render("error.ejs");
  }
});
//Delete user
app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let q = `DELETE FROM users WHERE id = '${id}'`;
  try {
    connection.query(q, (error, result) => {
      if (error) throw error;
      res.redirect("/users");
    });
  } catch (error) {
    console.log(error);
    res.render("error.ejs");
  }
});
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
