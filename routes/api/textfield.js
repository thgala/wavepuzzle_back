var 
  keystone = require('keystone'),
  ApiError = require('./../apiError'),
  TextField = keystone.list('TextField');


exports.list = function(req, res) {

  TextField.model.find()
    .exec(function(err, textFields) {
      if (err) return ApiError.common(err, res)

      res.status(200).json(textFields);
    })
};

exports.get = function(req, res, next) {
  var
    textFieldId = req.params.id;

  TextField.model.findById(textFieldId)
    .exec(function(err, textField) {
      if (err) return ApiError.common(err, res)
      if (!textField) return ApiError.notFound(res)

      res.status(200).json(textField);
    })

};
