// Observer Pattern
class RideRequest {
  constructor() {
    this.observers = [];
    this.status = "Pending";
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(o => o !== observer);
  }

  setStatus(status) {
    this.status = status;
    this.notify();
  }

  notify() {
    this.observers.forEach(observer => observer.update(this.status));
  }
}

class Rider {
  constructor(name) {
    this.name = name;
  }

  update(status) {
    document.getElementById("rideStatus").innerText =
      `Hello ${this.name}, your ride is now: ${status}`;
  }
}

// Strategy Pattern
class FareStrategy {
  calculate(distance) {
    throw new Error("Implement in subclass");
  }
}

class NormalFare extends FareStrategy {
  calculate(distance) {
    return distance * 10;
  }
}

class SurgePricing extends FareStrategy {
  calculate(distance) {
    return distance * 15;
  }
}

class DiscountedFare extends FareStrategy {
  calculate(distance) {
    return distance * 8;
  }
}

class FareCalculator {
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  calculateFare(distance) {
    return this.strategy.calculate(distance);
  }
}

// Command Pattern
class Command {
  execute() {}
}

class RideService {
  bookRide() {
    console.log("Ride booked");
    return "Booked";
  }

  cancelRide() {
    console.log("Ride canceled");
    return "Canceled";
  }

  rateRide() {
    console.log("Ride rated");
    return "Rated";
  }
}

class BookRideCommand extends Command {
  constructor(service, request) {
    super();
    this.service = service;
    this.request = request;
  }

  execute() {
    const result = this.service.bookRide();
    this.request.setStatus(result);
  }
}

class CancelRideCommand extends Command {
  constructor(service, request) {
    super();
    this.service = service;
    this.request = request;
  }

  execute() {
    const result = this.service.cancelRide();
    this.request.setStatus(result);
  }
}

class RateRideCommand extends Command {
  constructor(service, request) {
    super();
    this.service = service;
    this.request = request;
  }

  execute() {
    const result = this.service.rateRide();
    this.request.setStatus(result);
  }
}

// App Setup
const rider = new Rider("Alice");
const rideRequest = new RideRequest();
rideRequest.subscribe(rider);

const service = new RideService();

document.getElementById("bookBtn").addEventListener("click", () => {
  new BookRideCommand(service, rideRequest).execute();
});

document.getElementById("cancelBtn").addEventListener("click", () => {
  new CancelRideCommand(service, rideRequest).execute();
});

document.getElementById("rateBtn").addEventListener("click", () => {
  new RateRideCommand(service, rideRequest).execute();
});

const fareCalculator = new FareCalculator();
const fareSelector = document.getElementById("fareType");

fareSelector.addEventListener("change", () => {
  let strategy;
  switch (fareSelector.value) {
    case "surge":
      strategy = new SurgePricing();
      break;
    case "discount":
      strategy = new DiscountedFare();
      break;
    default:
      strategy = new NormalFare();
  }

  fareCalculator.setStrategy(strategy);
  const fare = fareCalculator.calculateFare(5); // example distance = 5 km
  alert(`Fare calculated: ₹${fare}`);
});
