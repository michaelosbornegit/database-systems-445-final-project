// this file contains the javascript logic to display all info for a single car in the nascar app

class SingleCarAllInfoView {
  constructor() {
    // populate all fields
    const data = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('selectedCar')));
    document.getElementById('driverName').innerHTML = data.driver.FirstName + ' ' + data.driver.LastName;
    document.getElementById('number').innerHTML = data.car.Number;
    document.getElementById('gender').innerHTML = data.driver.Gender;
    document.getElementById('height').innerHTML = data.driver.Height;
    document.getElementById('rookieYear').innerHTML = data.driver.RookieYear;
    document.getElementById('manufacturer').innerHTML = data.manufacturer.Name;
    document.getElementById('team').innerHTML = data.team.Name;
    document.getElementById('owner').innerHTML = data.car_owner.Name;
  }
}

// wait until window loads to start to avoid race conditions
window.onload = () => {
  const globalScope = new SingleCarAllInfoView();
}
