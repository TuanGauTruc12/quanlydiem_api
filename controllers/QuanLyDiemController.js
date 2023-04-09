import { getScoreStudent, login } from "./../models/QuanLyDiemModel.js";

export const loginController = (req, res) => {
  const mssv = req.body.mssv;
  const email = req.body.email;
  login(mssv, email, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results[0][0]);
    }
  });
};

export const getDataScoreStudentByMSSV = (req, res) => {
  const mssv = req.body.mssv;

  getScoreStudent(mssv, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
