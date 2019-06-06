// This file is javascript logic for the driver list display page in the NASCAR app

class Drivers {
  constructor() {

    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    // connect to fetch driver information
    const userAction = async () => {
      const response = await fetch(proxyUrl + 'https://osbornem-database-project.herokuapp.com/getallcarinformation');
      const json = await response.json(); //extract JSON from the http response

      let tableBody = document.getElementById('tableBody');

      let found = false;

      json.forEach((joinedRow) => {
        const row = document.createElement('tr');

        sessionStorage.setItem(joinedRow.car.Number, JSON.stringify(joinedRow));

        row.addEventListener('click', () => {
          sessionStorage.setItem('selectedCar', joinedRow.car.Number);
          // console.log(location.pathname.substring(0, location.pathname.length - 'cars.html'.length));
          window.location.assign(location.pathname.substring(0, location.pathname.length - 'drivers.html'.length) + 'single-car-all-info-view.html');
        });

        const driverName = document.createElement('td');
        driverName.innerHTML = joinedRow.driver.FirstName + ' ' + joinedRow.driver.LastName;

        if (joinedRow.driver.DriverID == '9d18716c-fd73-48d4-b3da-44228c767b84') {
          found = true;
        }

        const carNum = document.createElement('td');
        carNum.innerHTML = joinedRow.car.Number;

        const teamName = document.createElement('td');
        teamName.innerHTML = joinedRow.team.Name;

        const rookieYear = document.createElement('td');
        rookieYear.innerHTML = joinedRow.driver.RookieYear;

        row.appendChild(carNum);
        row.appendChild(driverName);
        row.appendChild(teamName);
        row.appendChild(rookieYear);

        tableBody.appendChild(row);
      });

      if (found) {
        console.log('DRIVER ID 9d18716c-fd73-48d4-b3da-44228c767b84 FOUND, test passed!');
      } else {
        console.log('DRIVER ID 9d18716c-fd73-48d4-b3da-44228c767b84 NOT FOUND, test FAILED!');
      }

      // show the table now that its populated!
      document.getElementById('loading').style.display = 'none'
      document.getElementById('mainContent').style.display = 'block'
    }

    userAction();
  }
}

// kick off the whole thing
const globalScope = new Drivers();
