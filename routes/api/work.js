var 
  keystone = require('keystone'),
  ApiError = require('./../apiError'),
  Work = keystone.list('Work');


exports.list = function(req, res) {

  Work.model.find()
    .populate('tags')
    .populate('media')
    .exec(function(err, textFields) {
      if (err) return ApiError.common(err, res)

      res.status(200).json(textFields);
    })


};

exports.get = function(req, res, next) {
  var
    workId = req.params.id;

  Work.model.findById(workId)
    .exec(function(err, textField) {
      if (err) return ApiError.common(err, res)
      if (!textField) return ApiError.notFound(res)

      res.status(200).json(textField);
    })

};
