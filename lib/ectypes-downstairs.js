var DownstairsStrategy = function(downstairsConnection){
  this.downstairsConnection = downstairsConnection;
};

//build
DownstairsStrategy.prototype.build = function(modelName, values, cb){ 
  var modelInstance = new this.downstairsConnection.modelConstructors[modelName](values);

  cb(null, modelInstance);
}

//create
DownstairsStrategy.prototype.create = function(modelName, values, cb){ 
  var record = new this.downstairsConnection.modelConstructors[modelName](values)
  record.save(cb);
}

DownstairsStrategy.prototype.ignores = ['setup', 'ignores'];
module.exports = DownstairsStrategy;
