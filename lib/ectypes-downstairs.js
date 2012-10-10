var DownstairsStrategy = function(downstairsConnection){
  this.downstairsConnection = downstairsConnection;
};

//build

//create
DownstairsStrategy.create = function(modelName, values, cb){ 
  cb(null, this.downstairsConnection[modelName](values));
}

module.exports = DownstairsStrategy;
