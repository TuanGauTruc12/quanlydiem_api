import db from "../config/database.js";

export const login = (mssv, email, result) => {
    db.query(`CALL login('${mssv}', '${email}');`, (err, results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

export const getDataScoreModels = (mssv, result)=>{
    db.query(`CALL getScoreStudent('${mssv}');`, (err, results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0][0]);
        }
    });
}

export const getScoreStudent = (mssv, result)=>{
    db.query(`CALL getScoreStudent(${mssv});`, (err, results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
}