class Drivers {
  constructor() {

    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    const userAction = async () => {
      const response = await fetch(proxyUrl + 'https://osbornem-database-project.herokuapp.com/getallcarinformation');
      const json = await response.json(); //extract JSON from the http response
      console.log(json);

      let tableBody = document.getElementById('tableBody');
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

        console.log(joinedRow);
      });

      // show the table now that its populated!
      document.getElementById('loading').style.display = 'none'
      document.getElementById('mainContent').style.display = 'block'
    }

    userAction();
  }
}

// kick off the whole thing
const globalScope = new Drivers();
