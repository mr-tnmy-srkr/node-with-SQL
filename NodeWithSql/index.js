const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "student",
  password: "Tanmoy@1993",
});

// A simple SELECT query
try {
  connection.query("SHOW TABLES", (err, results) => {
    if (err) throw err;
    console.log(results); // results contains rows returned by server
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
