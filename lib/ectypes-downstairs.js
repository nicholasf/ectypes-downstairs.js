var DownstairsStrategy = function(Models){
  this.Models = Models;
};

//build
DownstairsStrategy.prototype.build = function(modelName, values, cb){ 
  var modelInstance = new this.Models[modelName](values);
  cb(null, modelInstance);
}

//create
DownstairsStrategy.prototype.create = function(modelName, values, cb){ 
  var record = new this.Models[modelName](values)
  record.save(cb);
}

DownstairsStrategy.prototype.ignores = ['setup', 'ignores'];
module.exports = DownstairsStrategy;
