// Car constructor
function Car(make, model, year, type = 'Sedan', isAvailable = true) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.type = type;
    this.isAvailable = isAvailable;
}

// Customer constructor
function Customer(name, rentedCars = []) {
    this.name = name;
    this.rentedCars = rentedCars;
    this.discountRate = 0;
}

// Method for customers to rent cars
Customer.prototype.rentCar = function(car) {
    if (!car.isAvailable) {
        console.log(`Sorry, ${car.make} ${car.model} is already rented.`);
        return false;
    }
    
    car.isAvailable = false;
    this.rentedCars.push(car);
    console.log(`${this.name} rented ${car.make} ${car.model}.`);
    return true;
};

// Method for customers to return cars
Customer.prototype.returnCar = function(car) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const carIndex = this.rentedCars.findIndex(c => 
                c.make === car.make && c.model === car.model);
            
            if (carIndex !== -1) {
                car.isAvailable = true;
                this.rentedCars.splice(carIndex, 1);
                console.log(`${this.name} returned ${car.make} ${car.model}.`);
                resolve(true);
            } else {
                console.log(`${this.name} didn't rent this car.`);
                resolve(false);
            }
        }, 2000);
    });
};

// Premium Customer constructor (inherits from Customer)
function PremiumCustomer(name, rentedCars = []) {
    Customer.call(this, name, rentedCars);
    this.discountRate = 0.1;
}

// Set up inheritance
PremiumCustomer.prototype = Object.create(Customer.prototype);
PremiumCustomer.prototype.constructor = PremiumCustomer;

// Rental price calculation
function calculateRentalPrice(car, days, customer) {
    const basePrice = 50;
    const typeMultipliers = {
        'Sedan': 1,
        'SUV': 1.5,
        'Luxury': 2,
        'Sports': 1.8
    };
    
    const price = basePrice * typeMultipliers[car.type] * days;
    const discount = price * (customer.discountRate || 0);
    return price - discount;
}

// Maintenance function
function performMaintenance(car, delay) {
    car.isAvailable = false;
    console.log(`${car.make} ${car.model} is undergoing maintenance...`);
    
    return new Promise((resolve) => {
        setTimeout(() => {
            car.isAvailable = true;
            console.log(`${car.make} ${car.model} maintenance complete and ready for rent.`);
            resolve(car);
        }, delay);
    });
}

// Demonstration
async function runSimulation() {
    // Create cars
    const cars = [
        new Car('Toyota', 'Corolla', 2020, 'Sedan'),
        new Car('Ford', 'Explorer', 2021, 'SUV'),
        new Car('BMW', 'M5', 2022, 'Sports'),
        new Car('Mercedes', 'S-Class', 2023, 'Luxury')
    ];
    
    // Create customers
    const regularCustomer = new Customer('John Doe');
    const premiumCustomer = new PremiumCustomer('Jane Smith');
    
    // Rent cars
    regularCustomer.rentCar(cars[0]);
    premiumCustomer.rentCar(cars[1]);
    
    // Try to rent an already
