import mysql from "mysql2";

const connectionString = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.MYSQLLINKEDIN,
  database: "linkedin-clone",
});

if (!connectionString) {
  throw new Error("Please provide a valid connection string");
}

const firstName = "Ali Asghar2";
const lastName = "Sedighian2";
const userId = "637826387298327893298234";
const emailAddress = "as.sedighian@gmail.com4";
const created_at = "17150657301334";

const connectMySql = async () => {
  try {
    if (connectionString) {
      console.log("____ connecting to MySQL ____");
      connectionString.query(
        "INSERT INTO users (firstName, lastName, userId, emailAddress, created_at) VALUES (?,?,?,?,?)",
        [firstName, lastName, userId, emailAddress, created_at],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("MYSQL Work Successfully");
            // res.send("Values Inserted");
          }
        }
      );
    }
  } catch (error) {
    console.log("Error connecting to MySQL: ", error);
  }
};
export default connectMySql;
