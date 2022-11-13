var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    suite('Routing Tests', function () {
        suite('GET /api/convert', function () {
            test('Convert 10L', function (done) {
                chai.request(server)
                    .get('/api/convert')
                    .query({ input: '10L' })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, 10);
                        assert.equal(res.body.initUnit, 'L');
                        assert.approximately(res.body.returnNum, 2.64172, 0.00001);
                        assert.equal(res.body.returnUnit, 'gal');
                        done();
                    });
            });

            test('Convert 32g', function (done) {
                chai.request(server)
                    .get('/api/convert')
                    .query({ input: '32g' })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.text, 'invalid unit');
                        done();
                    });
            });

            test('Convert 3/7.2/4kg', function (done) {
                chai.request(server)
                    .get('/api/convert')
                    .query({ input: '3/7.2/4kg' })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.text, 'invalid number');
                        done();
                    });
            });

            test('Convert 3/7.2/4kilomegagram', function (done) {
                chai.request(server)
                    .get('/api/convert')
                    .query({ input: '3/7.2/4kilomegagram' })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.text, 'invalid number and unit');
                        done();
                    });
            });

            test('Convert kg', function (done) {
                chai.request(server)
                    .get('/api/convert')
                    .query({ input: 'kg' })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, 1);
                        assert.equal(res.body.initUnit, 'kg');
                        assert.approximately(res.body.returnNum, 2.20462, 0.00001);
                        assert.equal(res.body.returnUnit, 'lbs');
                        done();
                    });
            });
        });
    });
});
