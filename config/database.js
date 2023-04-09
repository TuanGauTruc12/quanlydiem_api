import mysql from "mysql2";

const db = mysql.createConnection({
    host: "db4free.net",
    user: "tuan2001",
    password: "tuan2001",
    database: "quanlydiem"
});

db.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

export default db;