'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler');

module.exports = function (app) {
    let convertHandler = new ConvertHandler();

    app.route('/api/convert').get(function (req, res) {
        const input = req.query.input;
        const initNum = convertHandler.getNum(input);
        const initUnit = convertHandler.getUnit(input);
        if (initNum === 'invalid number' && initUnit === 'invalid unit') {
            res.status(200).send('invalid number and unit');
            return;
        }
        if (initNum === 'invalid number') {
            res.status(200).send('invalid number');
            return;
        }
        if (initUnit === 'invalid unit') {
            res.status(200).send('invalid unit');
            return;
        }
        const returnUnit = convertHandler.getReturnUnit(initUnit);
        const returnNum = convertHandler.convert(initNum, initUnit);
        const result = convertHandler.getString(
            initNum,
            initUnit,
            returnNum,
            returnUnit
        );
        res.status(200).json({
            initNum: initNum,
            initUnit: initUnit,
            returnNum: returnNum,
            returnUnit: returnUnit,
            string: result,
        });
    });
};
