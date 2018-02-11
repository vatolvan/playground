class Construct {
    constructor (name, buildYear) {
        this.name = name;
        this.buildYear = buildYear
    }
    
    getAge() {
        return new Date().getFullYear() - this.buildYear;
    }
    
    getName() {
        return this.name;
    }
}

class Street extends Construct {
    constructor (name, buildYear, length, size = "unknown") {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
    
    getLength() {
        return this.length;
    }
    
    logReport() {
        console.log(`${this.name}, built in ${this.buildYear}, is a ${this.size} street.`)
    }
}

class Park extends Construct {
    constructor (name, buildYear, trees, area) {
        super(name, buildYear);
        this.trees = trees;
        this.area = area;
    }
    
    getTrees() {
        return this.trees;
    }
    
    logReport() {
        console.log(`${this.name} has a tree density of ${this.trees / this.area} trees per square km.`)
    }
    
}

class Town extends Construct {
    constructor (name, buildYear, ...constructs) {
        super(name, buildYear);
        
        this.constructs = new Map();
        this.constructs.set("Parks", new Array());
        this.constructs.set("Streets", new Array());
        
        for (let construct of constructs) {
            if (construct instanceof Park) {
                this.constructs.get("Parks").push(construct);
            } else if (construct instanceof Street) {
                this.constructs.get("Streets").push(construct);
            }
        }   
    }
    
    addStreet(street) {
        if (street instanceof Street && !this.constructs.get("Streets").includes(street)) {
            this.constructs.get("Streets").push(street);
        } else {
            console.log("Tried to add stret but was not street!")
        }
    }
    
    addStreet(park) {
        if (park instanceof Park && !this.constructs.get("Parks").includes(park)) {
            this.constructs.get("Parks").push(park);
        } else {
            console.log("Tried to add park but was not Park!")
        }
    }
    
    generateReport() {
        
        console.log("---- PARKS REPORT ----");
        const parks = this.constructs.get("Parks");
        const totalAge = parks.reduce((prev, cur) => prev + cur.getAge(), 0);
        const parksWithTrees = parks.filter(x => x.getTrees() >= 1000);
        const numberOfParks = parks.length;
        parks.forEach(park => park.logReport());
        console.log(`Our ${numberOfParks} parks have an average age of ${totalAge / numberOfParks} years.`)        
        parksWithTrees.forEach(park => console.log(`${park.getName()} has more than 1000 trees`));
        
        console.log("---- STREETS REPORT ----");
        const streets = this.constructs.get("Streets");
        const totalLength = streets.reduce((prev, cur) => prev + cur.getLength(), 0);
        const numberOfStreets = streets.length;
        streets.forEach(street => street.logReport());
        console.log(`Our ${numberOfStreets} streets have a total length of ${totalLength} km with an average length of ${totalLength / numberOfStreets} km.`);
        
        
    }
}

const street1 = new Street("tapionkatu", 1990, 10, "small");
const street2 = new Street("kalevankatu", 1950, 1, "tiny");
const street3 = new Street("testikatu", 1995, 1);

const park1 = new Park("Central park", 1100, 5000, 30);
const park2 = new Park("Side park", 2000, 300, 2);
const park3 = new Park("Big park", 1100, 10000, 100);

const town = new Town("Test Town", 1000, street1, park3, street2, park1, park2, street3);






