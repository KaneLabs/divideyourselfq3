var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:location', function (req, res, next) {

});

router.post('/:location', function (req, res, next) {

});

module.exports = router;
