'use strict'

/**
 * Module Dependencies
 */
const _      = require('lodash'),
      errors = require('restify-errors')
var srv = require('../s3modules/listkeys');

server.get('/bucket/:name', function (req, res, next) {
  console.log('Please specify a narrow filter, either a year or a combination of  year, month and/or date');
  var err = new restify.errors.InternalServerError('Please specify a narrow filter, either a year or a combination of  year, month and/or date');
  return next(err);
});

server.get('/stich/:bucket/:yr/:mnt/:dt', function (req, res, next) {
  var buck = req.params['bucket']; 
  var yr =  req.params['yr']; 
  var mnt = req.params['mnt'];      
  var dt =  req.params['dt'];         
  var prefix = 'yr=' + yr+'/mnth=' + mnt + ''+'/dt=' + dt;
  srv.handleapicall(buck, prefix, function(err, response){
      if (err){
          var error = new restify.errors.InternalServerError(err);
          return next(error);
      }
 
     res.send(response);
     next();          
  })  
  
   
});

server.get('/stich/:bucket/:yr/:mnt', function (req, res, next) {
  var buck = req.params['bucket']; 
  var yr =  req.params['yr']; 
  var mnt = req.params['mnt'];      
   
  var prefix = 'yr=' + yr+'/mnth=' + mnt;
  srv.handleapicall(buck, prefix, function(err, response){
      if (err){
          var error = new restify.errors.InternalServerError(err);
          return next(error);
      }

     res.send(response);
     next();          
  })  
  
   
});