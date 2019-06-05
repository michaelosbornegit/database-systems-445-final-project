class SingleCarAllInfoView {
  constructor() {
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

window.onload = () => {
  const globalScope = new SingleCarAllInfoView();
}
