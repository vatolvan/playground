
function printFullAge(years) {

    var ages = [];
    for (var i = 0; i < years.length; i++) {
        ages[i] = 2018 - years[i];
    }

    var isOfAge = [];
    for (var j = 0; j < ages.length; j++) {
        if (ages[j] >= 18) {
            isOfAge[j] = true;
        } else {
            isOfAge[j] = false;
        }
    }
    return isOfAge;
}

var years1 = [1965, 2008, 1992];

console.log(printFullAge(years1))
