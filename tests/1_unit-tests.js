var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    suite('Function convertHandler.getNum(input)', function () {
        test('Whole number input', function (done) {
            var input = '55kg';
            assert.equal(convertHandler.getNum(input), 55);
            done();
        });

        test('Decimal Input', function (done) {
            var input = '5.5kg';
            assert.equal(convertHandler.getNum(input), 5.5);
            done();
        });

        test('Fractional Input', function (done) {
            var input = '5/5kg';
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });

        test('Fractional Input / Decimal', function (done) {
            var input = '5.5/2kg';
            assert.equal(convertHandler.getNum(input), 2.75);
            done();
        });

        test('Invalid Input', function (done) {
            var input = '5/5/kg';
            assert.equal(convertHandler.getNum(input), 'invalid number');
            done();
        });

        test('Not Numerical Input', function (done) {
            var input = 'kg';
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });
    });

    suite('Function convertHandler.getUnit(input)', function () {
        test('Valid Unit Inputs', function (done) {
            var input = [
                'gal',
                'l',
                'mi',
                'km',
                'lbs',
                'kg',
                'GAL',
                'L',
                'MI',
                'KM',
                'LBS',
                'KG',
            ];
            var expect = [
                'gal',
                'L',
                'mi',
                'km',
                'lbs',
                'kg',
                'gal',
                'L',
                'mi',
                'km',
                'lbs',
                'kg',
            ];
            input.forEach(function (el, i) {
                assert.equal(convertHandler.getUnit(el), expect[i]);
            });
            done();
        });

        test('Unknown Unit Input', function (done) {
            var input = '55xkg';
            assert.equal(convertHandler.getUnit(input), 'invalid unit');
            done();
        });
    });

    suite('Function convertHandler.getReturnUnit(initUnit)', function () {
        test('Valid Unit Inputs', function (done) {
            var input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            var expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
            input.forEach(function (el, i) {
                assert.equal(convertHandler.getReturnUnit(el), expect[i]);
            });
            done();
        });
    });

    suite('Function convertHandler.spellOutUnit(unit)', function () {
        test('Valid Unit Inputs', function (done) {
            var input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            var expect = [
                'gallons',
                'liters',
                'miles',
                'kilometers',
                'pounds',
                'kilograms',
            ];
            input.forEach(function (el, i) {
                assert.equal(convertHandler.spellOutUnit(el), expect[i]);
            });
            done();
        });
    });

    suite('Function convertHandler.convert(num, unit)', function () {
        test('gal to L', function (done) {
            var input = [3, 'gal'];
            var expected = 11.35623;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.00001
            );
            done();
        });

        test('L to gal', function (done) {
            var input = [3, 'L'];
            var expected = 0.79252;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.00001
            );
            done();
        });

        test('mi to km', function (done) {
            var input = [3, 'mi'];
            var expected = 4.82802;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.00001
            );
            done();
        });

        test('km to mi', function (done) {
            var input = [3, 'km'];
            var expected = 1.86412;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.00001
            );
            done();
        });

        test('lbs to kg', function (done) {
            var input = [3, 'lbs'];
            var expected = 1.36078;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.00001
            );
            done();
        });

        test('kg to lbs', function (done) {
            var input = [3, 'kg'];
            var expected = 6.61387;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.00001
            );
            done();
        });
    });
});
