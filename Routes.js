var express = require('express');
var multer  = require('multer');
var LinvoDB = require("linvodb3");

var router  = express.Router();
var upload  = multer();
//multer middleware for brevity.  Going to want to add a function that deletes old food, so hdd doesn't fill.
var uploading = multer({
  dest: __dirname + '../public/uploads/',
  limits: {fileSize: 1000000, files:1},
})
LinvoDB.dbPath = process.cwd();
var Foods = new LinvoDB("doc", { /* schema, can be empty */ });

router.get('/',function(request,response){
    response.sendFile('Epulae-Alpha.html', {"root": __dirname});
});

router.post('/pictures/upload', [ upload.single('image'), function(request, response) {
    var file = request.file;
    console.log(file);
    response.end();
}]);

router.get('/reciept',function(request,response){
    console.log("no bueno");
    response.sendFile('Reciept.html', {"root":__dirname + "/views/"});
});

router.get('/downloadFoodItems',function(request,response){
    console.log("New foods download request.");
    Foods.find({}, function (err, docs) {
        response.send(docs);
    });
});

router.post('/addFoodItem',function(request,response){
    console.log(request.body);
    Foods.insert(request.body, function (err, newDoc) {
        response.send({message:"New food item added: "+request.body});
    });
});


router.post('/editFoodItem',function(request,response){
    Foods.findOne({ foodID: request.foodID }, function(err, doc) {
        doc.save(function(err) { response.send({message:"Food updated successfully."})});
    });
});

router.post('/deleteFoodItem',function(request,response){
    var id = request.id;
    Foods.remove({ id: id }, {}, function (err, numRemoved) {
        console.log("Food removed successfully.");
        response.send({message: "Food removed successfully: "+id})
    });
});

module.exports = router;
