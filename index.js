const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser');
const cors = require('cors');


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "bigborisu19@",
    database: "CRUDDataBase"
});

app.use(cors());
app.use(express.json()); // accept information with json form
app.use(bodyParser.urlencoded({extended: true}));


// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "bigborisu19@",
//     database: "CRUDDataBase"
// });

// connection.connect();

// connection.query('SELECT * FROM movie_reviews', function(err, results, fields) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(results);
// });

// connection.end();

app.post("/api/insert", (req, res) => {

    const ID = req.body.ID;
    const PW = req.body.PW;

    const sqlInsert = "INSERT INTO users (username, password) VALUES (?,?);";
    db.query(sqlInsert, [ID, PW], (err, result) => {
        if (err) {
            res.send("ID already exists");
        } else {
            res.send("ID registered");
        }

    });
});

app.post("/api/login", (req, res) => {

    const loginID = req.body.loginID;
    const loginPW = req.body.loginPW;
    
    const adminID = "KimBorisu";
    const adminPW = "55555";

    const sqlInsert = "SELECT * FROM users WHERE username = ? AND password = ?;";
    db.query(sqlInsert, [loginID, loginPW], (err, result) => {
        if (err) {
            res.send("error");
        }
        else if (loginID ==adminID && loginPW==adminPW) {
            res.send("Administrator login");
        }
        else if (result.length > 0) {
            res.send("Sucessfully login");
        } else {
            res.send("ID not exists");
        }

    });
});



/////Search System
//list by colum name
app.post("/serch/all", (req, res) => {

    //const loginID = req.body.loginID;
    //const loginPW = req.body.loginPW;
    const colname = req.body.colname;

    const sqlInsertdata = "SELECT " + colname + " FROM resultdata";
    db.query(sqlInsertdata, [colname], (err, result) => {
        if (err) {
            console.log("error");
        } else {
            console.log(result);
            res.send(result);
        }

    });
});

app.post("/datasend", (req, res) => {

    //const loginID = req.body.loginID;
    //const loginPW = req.body.loginPW;
    const name = "111";
    const sendcurrenttime = "2023/05/15/15/23";
    const sendsolvingtimeByQuestion = req.body.sendsolvingtimeByQuestion;
    const sendquestionVisitLog = req.body.sendquestionVisitLog;
    const sendanswerChangeNumber = req.body.sendanswerChangeNumber;
    const sendanswer = req.body.sendanswer;  
    let text = "INSERT INTO resultdata (userid, date, answer, solvingtime, log, answerchange) VALUES (?,?,?,?,?,?);";

    db.query(text, [name,sendcurrenttime,sendanswer,sendsolvingtimeByQuestion,sendquestionVisitLog,sendanswerChangeNumber], (err, result) => {
        if (err) {
            console.log("error");
        } else {
            console.log(result);
            res.send(result);
        }

    });
});

//search the record of specific ID
app.post("/serch/IDsearch", (req, res) => {

    //const loginID = req.body.loginID;
    //const loginPW = req.body.loginPW;
    const IDname = req.body.IDname;

    const sqlInsertdata = "SELECT * FROM resultdata where userid = ?";
    db.query(sqlInsertdata, [IDname], (err, result) => {
        if (err) {
            console.log(err);
            res.send("no data");
        } else {
            console.log(result);
            res.send(result);
        }

    });
});


app.get("/api/get", (req,res) => {
    const sqlselect = "SELECT * FROM users;";
    db.query(sqlselect, (err, result) => {
        res.send(result);
    });

    // const sqlInsert = "INSERT INTO movie_reviews (movie_name, movie_review) VALUES ('ccinception','good movie');";
    // db.query(sqlInsert, (err, result) => {
    //     res.send("hellos");
    // });
    

});

app.listen(3001, () => {
    console.log('running 3001');
});