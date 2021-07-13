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
}
var dbcon = mysql.createConnection(dbConfiObj);
dbcon.connect(function (err) {
    if (err)
        console.log(err.message);
    else
        console.log("Provider Router Connected to Database"); 
})
app.get("/p", function (req, resp)//----------------------OPEN PROVIDER PROFILE---------------------------------------------
{
    //resp.sendFile(path.join('__dirname','public', 'provider-profile.html'));
    resp.sendFile(process.cwd() + "/public/provider-profile.html");
})
app.get("/ma", function (req, resp)//---------------------OPEN MED AVAIL---------------------------------------------
{
    resp.sendFile(process.cwd() + "/public/med-avail.html");
})
app.get('/mm', function (req, res)//----------------------OPEN MED MANAGER---------------------------------------------------------
{
    res.sendFile(path.join(__dirname, 'public/med-manager.html'));
});
app.get("/getalldataP", function (req, resp)//------------AJAX GET ALL DATA TABLE PROFILES--------------------------------------------------
{
    dbcon.query("select * from profiles where email=? ", [req.query.sid], function (err, res) {
        if (err)
            console.log(err)
        else
            resp.send(res);
    });
});
app.post("/pprofs", function (req, resp)//----------------PROCESS SAVE PROVIDER PROFILE IN PROFILES----------------------------------------------
{
    resp.setHeader("content-type", "text/html");
    if (req.files == null) {
        req.body.picname = "nopic.png";
        resp.write("File Uploaded Name: " + req.body.picname + "<br>");
    }
    else {
        //resp.write("File Name: "+JSON.stringify(req.files.ppic.name)+"<br>");
        req.body.picname = req.files.ppic.name;
        var uploadingpath = path.join(process.cwd(), "public", "uploads", req.files.ppic.name);
        req.files.ppic.mv(uploadingpath, function (err) {
            if (err)
                console.log(err);
            else
                resp.write("File Uploaded Name: " + req.body.picname + "<br>");
        });
    }

    var data = [req.body.tid, req.body.tn, req.body.tcnt, req.body.tcty, req.body.tad, req.body.tac, req.body.picname];
    dbcon.query("insert into profiles values (?,?,?,?,?,?,?)", data, function (err) {
        if (err)
            resp.write(err.message);
        else
            resp.write("Data saved to table profiles");
        resp.end();
    });
});
app.post("/pprofu", function (req, resp)//----------------PROCESS UPDATE PROVIDER PROFILE DATA----------------------------------------------
{
    resp.setHeader("content-type", "text/html");

    if (req.files == null) {
        req.body.picname = req.body.hid;
        resp.write("File uploaded: " + req.body.picname + "<br>")
    }
    else {
        //resp.write("File Name: "+JSON.stringify(req.files.ppic.name)+"<br>");
        req.body.picname = req.files.ppic.name;
        //console.log(req.body.picname);
        var uploadingpath = path.join(process.cwd(), "public", "uploads", req.files.ppic.name);
        req.files.ppic.mv(uploadingpath, function (err) {
            if (err)
                console.log(err); 
            else
                resp.write("File uploaded: " + req.body.picname + "<br>")
        });
    }
    var data = [req.body.tn, req.body.tcnt, req.body.tcty, req.body.tad, req.body.tac, req.body.picname, req.body.tid];
    dbcon.query("update profiles set name=?,contact=?,city=?,address=?,acard=?,picname=? where email=?", data, function (err) {
        if (err)
            resp.write(err.message);
        else
            resp.write("Data updated in table profiles");
            resp.end();
    });
});
module.exports = app;