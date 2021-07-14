var express=require("express");
var path=require("path");
var mysql = require("mysql");
var fileuploading = require("express-fileupload");
 
var app=express();
app.use(express.static("public"));//to server .css and .js files to client
app.use(fileuploading());
app.use(express.urlencoded({ extended: true }));
 
var pro = require("./provider-router");
app.use("/prouter", pro); 
var ned = require("./needy-router");
app.use("/nrouter", ned);

const port = process.env.PORT || 202;
app.listen(port,function()
{
    console.log("Server Started");
});
var dbConfiObj =
{
    // HOST: "localhost",
    // USER: "root",
    // PASSWORD: "",
    // DATABASE: "maindata"

    HOST: "us-cdbr-east-04.cleardb.com",
    USER: "b18b3ac4e2b587",
    PASSWORD: "011de83f",
    DATABASE: "heroku_ea4bcb02340f567"
}
// var dbcon = mysql.createConnection(dbConfiObj);
var dbcon = mysql.createPool({
    host: dbConfiObj.HOST,
    user: dbConfiObj.USER,
    password: dbConfiObj.PASSWORD,
    database: dbConfiObj.DATABASE
});
module.exports = dbcon;
// dbcon.connect(function (err)
// {
//     if (err)
//         console.log(err.message);
//     else
//         console.log("Main Server Connected to database");
// })
app.get("/",function(req,resp)//--------------------------OPEN INDEX PAGE--------------------------------------------------------------
{
    resp.sendFile(process.cwd()+"/public/index.html");
})
app.get("/getalldataU",function(req,resp)//---------------AJAX RESPONSE GET ALL DATA USERS--------------------------------------------------
{
    dbcon.query("select * from users where email=? ",[req.query.sid],function(err,res)
    {
        resp.send(res);
    });
    //resp.end("done");
});
app.get("/respinsert", function (req, resp)//-------------AJAX RESPONSE INSERT DATA INTO USER -------------------------------------
{
    dbcon.query("insert into users values(?,?,?,?,current_date())",[req.query.sid,req.query.spwd,req.query.sm,req.query.sel],function(err,res)
    {
        resp.send(res);
    });
}); 
app.post("/medsave", function (req, resp)//---------------PROCESS SAVE MED AVAIL DATA IN MEDECINES----------------------------------------------
{
    resp.setHeader("content-type", "text/html");

    if (req.files == null) {
        req.body.picname = "nopic.png";
        resp.write("File Uploaded: " + req.body.picname + "<br>");
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
                resp.write("File Uploaded: " + req.body.picname + "<br>");
        });
    }

    var data = [req.body.tid, req.body.tcty, req.body.mn, req.body.mc, req.body.md, req.body.ms, req.body.mq, req.body.picname];
    dbcon.query("insert into medecines values (null,?,?,?,?,?,?,?,?,current_date(),'Available')", data, function (err) {
        if (err)
            resp.write(err.message);
        else
            resp.write("Data saved to table medecines");
        resp.end();
    });
});
app.get("/fetchrid", function (req, resp)//---------------ANGULAR FETCH MEDICINE RECORD------------------------------------------------
{
    //console.log(req.query.srid);
    dbcon.query("select * from medecines where rid=?", [req.query.srid], function (err, res) {
        if (err)
            console.log(err)
        else
            resp.send(res);
    });
})
app.post("/updateMed", function (req, resp)//--------------UPDATE MEDICINE FROM MEDICINES-----------------------------------------
{
    resp.setHeader("content-type", "text/html");

    if (req.files == null) {
        req.body.picname = req.body.hidp;
        resp.write("File uploaded: " + req.body.picname + "<br>")
    }
    else {
        req.body.picname = req.files.ppic.name;
        var uploadingpath = path.join(process.cwd(), "public", "uploads", req.files.ppic.name);
        req.files.ppic.mv(uploadingpath, function (err) {
            if (err)
                console.log(err);
            else
                resp.write("File uploaded: " + req.body.picname + "<br>");
        });
    }

    var data = [req.body.mn, req.body.mc, req.body.md, req.body.ms, req.body.mq, req.body.picname, req.body.tr];
    dbcon.query("update medecines set medname=?,company=?,expdate=?,unit=?,qty=?, picname=? where rid=?", data, function (err) {
        if (err)
            resp.write(err.message);
        else
            resp.write("Data updated in table Medicines <br>");
            resp.end();
    });
})
app.get("/fetchUserM", function (req, resp)//-------------ANGULAR FETCH USER MEDECINES------------------------------------------------
{
    //console.log(req.query.uid);
    dbcon.query("select * from medecines where email=? and status=?",[req.query.uid,"Available"], function (err, res) {
        if (err)
            console.log(err) 
        else
            resp.send(res);
    });
})
app.get("/fetchCitiesM", function (req, resp)//-----------ANGULAR FETCH CITIES OF MEDICINES-----------------------------------------
{
    dbcon.query("select distinct city from medecines where status=?",["Available"], function (err, res) {
        if (err)
            console.log(err)
        else
            resp.send(res);
    })
})
app.get("/fetchallmedofselcity", function (req, resp)//---ANGULAR FETCH ALL MEDICINES OF SELECTED CITY------------------------------
{
    dbcon.query("select distinct medname from medecines where city=? and status=?",[req.query.selcity,"Available"], function (err, res) {
        if (err)
            console.log(err)
        else
            resp.send(res);
    })
})
app.get("/fetchselmedofselcity", function (req, resp)//---ANGULAR FETCH SELECTED MEDICINES OF SELECTED CITY--------------------------
{
    dbcon.query("select * from medecines where city=? and medname=? and status=?", [req.query.selcity,req.query.selmed,"Available"], function (err, res) {
        if (err)
            console.log(err)
        else
            resp.send(res);
    })
})
app.get("/deleteMed", function (req, resp)//--------------DELETE MEDICINE FROM MEDICINES-----------------------------------------
{
    console.log(req.query.uid);
    dbcon.query("update medecines set status=? where rid=?",["Donated",req.query.uid], function(err, res)
    {
        
        if (err)
            resp.send(err);
         else
             resp.send("Record deleted");
    })
})