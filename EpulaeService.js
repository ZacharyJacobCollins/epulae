var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var schedule = require('node-schedule');
var LinvoDB = require("linvodb3");
LinvoDB.dbPath = process.cwd();
var Foods = new LinvoDB("doc", { /* schema, can be empty */ });
var util = require('util');
var path = require('path');

var allowCrossDomain = function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(allowCrossDomain);

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use("/public",  express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(request,response){
    response.sendFile('Epulae-Alpha.html', {"root": __dirname});
});

app.get('/downloadFoodItems',function(request,response){
    console.log("New foods download request.");
    Foods.find({}, function (err, docs) {
        response.send(docs);
    });
});

app.post('/addFoodItem',function(request,response){
    console.log(request.body);
    Foods.insert(request.body, function (err, newDoc) {
        response.send({message:"New food item added: "+request.body.Name});
    });
});


app.post('/editFoodItem',function(request,response){
    Foods.findOne({ foodID: request.foodID }, function(err, doc) {
    doc.save(function(err) { response.send({message:"Food updated successfully."})}); 
    });
});

app.post('/deleteFoodItem',function(request,response){
    var id = request.id;
    Foods.remove({ id: id }, {}, function (err, numRemoved) {
        console.log("Food removed successfully.");
        response.send({message: "Food removed successfully: "+id})
    });
});

var server = app.listen(1020, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)
});
