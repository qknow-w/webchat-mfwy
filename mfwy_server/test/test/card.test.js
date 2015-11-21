/**
 * Created by Administrator on 2015/11/9 0009.
 */
var should = require('should');
var request=require('request');

var port="40002";
describe('card resource', function() {
    describe('get list', function() {
        it('should return list', function(done) {

            var request = require('request');
            request('http://localhost:'+port+"/v1/cards", function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body); // Show the HTML for the Google homepage.
                    done();
                }
            })

        });
    });
});
