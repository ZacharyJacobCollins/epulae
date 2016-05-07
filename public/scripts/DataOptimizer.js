var DataOptimizer = function(){};

DataOptimizer.prototype = {
    upconvert: function(standardData){
        var optimizedData = [];
        var keys = Object.keys(standardData);
        for(key in standardData){
            standardData[key];
            optimizedData.push({'key':key,'value':standardData[key]});
        }
        optimizedData.push({'key':'Image','value':'http://news.psu.edu/sites/default/files/styles/threshold-992/public/Haas%20Avocado%20Board.jpg?itok=jvT1kQsw'});
        return optimizedData;
    }
};