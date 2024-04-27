const express = require('express');
const app = express();
const port = 8080;
const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

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
app.get("/",(req,res)=>{
let q = "SELECT count(*) FROM user"
try {
    connection.query(q, (err,result)=>{
        if (err) throw err;
        console.log(result[0]["count(*)"]);
        res.send(result[0]);
    })
} catch (error) {
    console.log(error);
    res.send("Some error occurred in DB")
}
})

app.listen(port , ()=>{
console.log("Server is listening on port " + port);
})