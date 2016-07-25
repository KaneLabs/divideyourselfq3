var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  // send sitewide popular content
  res.send('respond with a resource');
  
});

module.exports = router;
