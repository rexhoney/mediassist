var express = require("express");
var path = require("path");
var mysql = require("mysql");
var app = express.Router();
app.use(express.static("public"));//to server .css and .js files to client
var dbConfiObj =
{
    host: "localhost",
    user: "root",
    password: "",
    database: "maindata"

    // host: "us-cdbr-east-04.cleardb.com",
    // user: "b18b3ac4e2b587",
    // password: "011de83f",
    // database: "heroku_ea4bcb02340f567"
}
var dbcon = mysql.createConnection(dbConfiObj);
dbcon.connect(function (err) {
    if (err)
        console.log(err.message);
    else
        console.log("Needy Router Connected to database");
});
app.get('/np', function (req, res)//----------------------OPEN NEEDY DETAILS-----------------------------------------------------
{
    res.sendFile(path.join(__dirname, '/public/needy-details.html'));
});
app.get('/mf', function (req, res)//----------------------OPEN MED FINDER-----------------------------------------------------
{
    res.sendFile(path.join(__dirname, '/public/med-finder.html'));
});
app.get("/getalldataN", function (req, resp)//------------AJAX GET ALL DATA TABLE NEEDY--------------------------------------------------
{
    dbcon.query("select * from needy where email=? ", [req.query.sid], function (err, res) {
        if (err)
            console.log(err)
        else
            resp.send(res);
    });
});
app.get("/needySave", function (req, resp)//--------------AJAX SAVE NEEDY DETAIL IN PROFILES----------------------------------------------
{
    resp.setHeader("content-type", "text/html");
    //req.body.picname = "nopic.png";
    //req.body.mob = "9999999999";
    //console.log(req.query.sid);

    var data = [req.query.sid, req.query.sn, req.query.sac, req.query.sc, req.query.sad];
    dbcon.query("insert into needy values (?,?,?,?,?)", data, function (err) {
        if (err) {
            console.log(err);
            resp.write(err.message);
        }
        else
            resp.write("Data saved to table profiles");
        resp.end();
    });
});
app.get("/needyUpdate", function (req, resp)//------------AJAX UPDATE NEEDY DETAIL IN PROFILES----------------------------------------------
{
    resp.setHeader("content-type", "text/html");
    //req.body.picname = "nopic.png"; 
    //req.body.mob = "9999999999";
    //console.log(req.query.sid);

    var data = [req.query.sn, req.query.sc, req.query.sad, req.query.sac, req.query.sid,];
    dbcon.query("update needy set name=?,city=?,address=?,aadhar=? where email=?", data, function (err) {
        if (err) {
            console.log(err);
            resp.write(err.message);
        }
        else
            resp.write("Data saved to table profiles");
        resp.end();
    });
});
module.exports = app;