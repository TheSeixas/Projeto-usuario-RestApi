var express = require('express');
var restify = require('restify-clients');
var assert = require( 'assert' );
var router = express.Router();

var client = restify.createJsonClient({
  url: 'http://localhost:4000'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  client.get('/users', function(err, require, response, obj) {
    assert.ifError(err);
  
    res.json( obj );
  });

});//fecha o router.get

router.post('/', function(req, res, next) {
  
  client.post('/users', req.body, function(err, require, response, obj) {
    assert.ifError(err);
  
    res.json( obj );
  });

});//fecha o router.post

router.get('/:id', function(req, res, next) {
  
  client.get(`/users/${ req.params.id }`, function(err, require, response, obj) {
    assert.ifError(err);
  
    res.json( obj );
  });

});//fecha o router.get com id

router.put('/:id', function(req, res, next) {
  
  client.put(`/users/${req.params.id}`, req.body ,  function(err, require, response, obj) {
    assert.ifError(err);
  
    res.json( obj );
  });

});
router.delete('/:id', function(req, res, next) {
  
  client.del(`/users/${ req.params.id }`, function(err, require, response, obj) {
    assert.ifError(err);
  
    res.json( obj );
  });

});
module.exports = router;
