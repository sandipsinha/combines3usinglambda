module.exports = {
    handleapicall: function(bucket, prefix, callback) {
    var AWS = require('aws-sdk');
    AWS.config.update({
        region: 'us-east-1'
    });
    AWS.config.loadFromPath('./s3modules/config.json');
    var s = require('../s3modules/gets3keys');
    var _ = require('underscore');
    var filelist = [];

    'use strict';
    var s3 = new AWS.S3();   

    s.listKeys({
        bucket: bucket,
        prefix: prefix
    }, function(error, keys) {
        if (error) {
            return console.error(error);
        }
        _.each(keys, function(key) {
            filelist.push(key);
        });
        stichfiles(filelist,bucket,s3, function(err, response){
            if (err) throw err
        });
    });
    /**************************************************************************/
    function stichfiles(filearray, bucket,s3) {

        var results = [];
        var itemsProcessed = 0;

        filearray.forEach(function(item, index, array) {
            var params = {
                Bucket: bucket,
                Key: item,
                ResponseContentType: 'application/json'
            }
            s3.getObject(params, function(err, data) {
                itemsProcessed++;
                if (err) log.error(err); // an error occurred
                else {
                    results.push(data.Body.toString('utf8'));
                    if (itemsProcessed === array.length) {
                        callback(null,results);
                    }
                }
            });
        });
    }

    /**************************************************************************/

}
}


        

        
                                    

 



