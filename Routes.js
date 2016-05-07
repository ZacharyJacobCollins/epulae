var express = require('express');
var router = express.Router();


router.get('/',function(request,response){
    response.sendFile('Epulae-Alpha.html', {"root": __dirname});
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
