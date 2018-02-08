/*jslint es6:true*/

var john = {
    name: "John",
    age: 25,
    job: "teacter",
    yearOfBirth: function () {
        this.yearOfBirth = 2018 - this.age;
    }
}

john.yearOfBirth();
console.log(john);


for (var i = 0; i < 10; i++) {
    console.log(i);
}

var obj1 = {
    name: "Tmp1",
    age: 5
}

var obj2 = {
    name: "Tmp2",
    c: 9
}

var obj3 = {...obj1, ...obj2};

console.log(obj3);