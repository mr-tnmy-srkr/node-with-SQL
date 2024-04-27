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

// let q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
let q = "INSERT INTO user (id, username, email, password) VALUES ?";

// let user = ["123","user_1","abc@gmail.com","pass1"]
/* let user = [
  ["124", "user_2", "abcd@gmail.com", "pass2"],
  ["125", "user_3", "abcde@gmail.com", "pass3"],
  ["126", "user_4", "abcdef@gmail.com", "pass4"],
]; */

let data = [];
for (let index = 1; index <= 100; index++) {
  data.push(getRandomUser());
}

try {
  // connection.query(q, user, (err, results) => {
  // connection.query(q, [user], (err, results) => {
  connection.query(q, [data], (err, results) => {
    if (err) throw err;
    console.log(results); // results contains rows returned by server
    // console.log(results.length); // results contains rows returned by server
    // console.log(results[0]); // results contains rows returned by server
    // console.log(results[1]); // results contains rows returned by server
  });
} catch (err) {
  console.log(err);
}

connection.end();
