const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "instagram",
  password: "Tanmoy@1993",
});

let q = "SHOW TABLES"
try {
  connection.query(q, (err, results) => {
    if (err) throw err;
    console.log(results); // results contains rows returned by server
    console.log(results.length); // results contains rows returned by server
    console.log(results[0]); // results contains rows returned by server
    console.log(results[1]); // results contains rows returned by server
  });
} catch (err) {
  console.log(err);
}

connection.end();

const createRandomUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};
// console.log(createRandomUser());
