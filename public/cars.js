// This file is javascript logic for the car list display page in the NASCAR app

class Cars {
  constructor() {

    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    // get the car information from the database
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
          window.location.assign(location.pathname.substring(0, location.pathname.length - 'cars.html'.length) + 'single-car-all-info-view.html');
        });

        const carNum = document.createElement('td');
        carNum.innerHTML = joinedRow.car.Number;

        if (joinedRow.car.Number == 4) {
          found = true;
        }

        const driverName = document.createElement('td');
        driverName.innerHTML = joinedRow.driver.FirstName + ' ' + joinedRow.driver.LastName;

        const teamName = document.createElement('td');
        teamName.innerHTML = joinedRow.team.Name;

        row.appendChild(carNum);
        row.appendChild(driverName);
        row.appendChild(teamName);

        tableBody.appendChild(row);
      });

      if (found) {
        console.log('CAR 4 FOUND, test case passed!');
      } else {
        console.log('CAR 4 NOT FOUND, TEST CASE NOT PASSED!');
      }

      // show the table now that its populated!
      document.getElementById('loading').style.display = 'none'
      document.getElementById('mainContent').style.display = 'block'
    }

    userAction();
  }
}

// kick off the whole thing
const globalScope = new Cars();
