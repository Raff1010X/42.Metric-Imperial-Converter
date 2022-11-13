function ConvertHandler() {
    this.getNum = function (input) {
        let result;
        if (input.includes('/')) {
            let numbers = input.split('/');
            if (numbers.length > 2) return 'invalid number';
            result = Number(numbers[0] / numbers[1].replace(/[^\d.]/g, ''));
        } else result = Number(input.replace(/[^\d.]/g, ''));
        if (result === 0) return 1;
        return result;
    };

    this.getUnit = function (input) {
        let result = input
            .toString()
            .toLowerCase()
            .replace(/[/.0-9]/g, '');
        if (result === "l") result = "L"
        const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
        if (units.indexOf(result) === -1) result = 'invalid unit';
        return result;
    };

    this.getReturnUnit = function (initUnit) {
        let result = 'invalid unit';
        if (initUnit === 'gal') result = 'L';
        else if (initUnit === 'L') result = 'gal';
        else if (initUnit === 'mi') result = 'km';
        else if (initUnit === 'km') result = 'mi';
        else if (initUnit === 'lbs') result = 'kg';
        else if (initUnit === 'kg') result = 'lbs';
        return result;
    };

    this.spellOutUnit = function (unit) {
        let result = 'invalid unit';
        if (unit === 'gal') result = 'gallons';
        else if (unit === 'L') result = 'liters';
        else if (unit === 'mi') result = 'miles';
        else if (unit === 'km') result = 'kilometers';
        else if (unit === 'lbs') result = 'pounds';
        else if (unit === 'kg') result = 'kilograms';
        return result;
    };

    this.convert = function (initNum, initUnit) {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;
        let convert;
        if (initUnit === 'gal') convert = initNum * galToL;
        if (initUnit === 'L') convert = initNum / galToL;
        if (initUnit === 'mi') convert = initNum * miToKm;
        if (initUnit === 'km') convert = initNum / miToKm;
        if (initUnit === 'lbs') convert = initNum * lbsToKg;
        if (initUnit === 'kg') convert = initNum / lbsToKg;
        const result = Number(Number(convert).toFixed(5));
        return result;
    };

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {
        let result;
        result = `${initNum} ${this.spellOutUnit(
            initUnit
        )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
        return result;
    };
}

module.exports = ConvertHandler;
