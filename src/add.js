var add = (function () {
    function add(number1, number2) {

        var neg = 0, ind = -1;

        //check for negatives
        if (number1[0] == '-') {
            neg++;
            ind = 1;
            number1 = number1.substring(1);
        }
        if (number2[0] == '-') {
            neg++;
            ind = 2;
            number2 = number2.substring(1);
        }

        var parts1 = number1.split('.'),
            parts2 = number2.split('.');

        var li = Math.max(parts1[0].length, parts2[0].length),
            ld1 = parts1[1] ? parts1[1].length : 0,
            ld2 = parts2[1] ? parts2[1].length : 0,
            ld = Math.max(ld1, ld2);

        if (neg == 1) {
            if (ind == 1)
                number1 = compliment(number1);
            else
                number2 = compliment(number2);
        }

        var res = addCore(number1, number2);

        if (!neg)
            return trim(res);
        else if (neg == 2)
            return ('-' + trim(res));
        else {
            if (res.length == li + ld + 1 + (ld ? 1 : 0))
                return trim(res.substring(1));
            else
                return ('-' + trim(compliment(res)));
        }
    }

    function compliment(number) {
        var s = '',
            l = number.length,
            dec = number.split('.')[1],
            ld = dec ? dec.length : 0;

        for (var i = 0; i < l; i++) {
            if (number[i] >= '0' && number[i] <= '9')
                s += (9 - parseInt(number[i]));
            else
                s += number[i];
        }

        var one = (ld > 0) ? ('0.' + (new Array(ld)).join('0') + '1') : '1';

        return addCore(s, one);
    }

    function trim(number) {
        var parts = number.split('.');

        if (!parts[0])
            parts[0] = '0';

        while (parts[0][0] == '0' && parts[0].length > 1)
            parts[0] = parts[0].substring(1);

        return parts[0] + (parts[1] ? ('.' + parts[1]) : '');
    }

    function addCore(number1, number2) {
        var parts1 = number1.split('.'),
            parts2 = number2.split('.');

        //pad integral part
        var length1 = parts1[0].length,
            length2 = parts2[0].length;

        if (length1 > length2) {
            parts2[0] = (new Array(Math.abs(length1 - length2) + 1)).join('0') + (parts2[0] ? parts2[0] : '');
        } else {
            parts1[0] = (new Array(Math.abs(length1 - length2) + 1)).join('0') + (parts1[0] ? parts1[0] : '');
        }

        //pad fractional part
        var length1 = parts1[1] ? parts1[1].length : 0,
            length2 = parts2[1] ? parts2[1].length : 0;
        if (length1 || length2) {
            if (length1 > length2) {
                parts2[1] = (parts2[1] ? parts2[1] : '') + (new Array(Math.abs(length1 - length2) + 1)).join('0');
            } else {
                parts1[1] = (parts1[1] ? parts1[1] : '') + (new Array(Math.abs(length1 - length2) + 1)).join('0');
            }
        }

        number1 = parts1[0] + ((parts1[1]) ? ('.' + parts1[1]) : '');
        number2 = parts2[0] + ((parts2[1]) ? ('.' + parts2[1]) : '');

        var sum = ''
        carry = 0;

        for (var i = number1.length - 1; i >= 0; i--) {
            if (number1[i] === '.') {
                sum = '.' + sum;
                continue;
            }
            var temp = parseInt(number1[i]) + parseInt(number2[i]) + carry;
            sum = (temp % 10) + sum;
            carry = parseInt(temp / 10);
        }

        return carry ? ('1' + sum) : sum;
    }

    return add;

})();
