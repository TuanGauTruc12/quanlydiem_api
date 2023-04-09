import db from "../config/database.js";

export const importTable = (table, data) => db.query(`INSERT INTO ${table} SET ${data};`,(err, results) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Success");
  }
});
