exports.common = function(err, res) {
  return res.status(500).json({
    message: 'Database error',
    status: 500,
    data: err
  });
}

exports.notFound = function(res) {
  return res.status(404).json({
    message: 'Not found',
    status: 404
  });
}
