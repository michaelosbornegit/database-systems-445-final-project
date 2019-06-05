class Tracks {
  constructor() {

    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    const userAction = async () => {
      const response = await fetch(proxyUrl + 'https://osbornem-database-project.herokuapp.com/gettracks');
      const json = await response.json(); //extract JSON from the http response
      console.log(json);

      let tableBody = document.getElementById('tableBody');
      json.forEach((joinedRow) => {
        const row = document.createElement('tr');

        sessionStorage.setItem(joinedRow.car.Number, JSON.stringify(joinedRow));

        row.addEventListener('click', () => {
          sessionStorage.setItem('selectedCar', joinedRow.car.Number);
          // console.log(location.pathname.substring(0, location.pathname.length - 'cars.html'.length));
          window.location.assign(location.pathname.substring(0, location.pathname.length - 'cars.html'.length) + 'single-car-all-info-view.html');
        });

        const carNum = document.createElement('td');
        carNum.innerHTML = joinedRow.car.Number;

        const driverName = document.createElement('td');
        driverName.innerHTML = joinedRow.driver.FirstName + ' ' + joinedRow.driver.LastName;

        const teamName = document.createElement('td');
        teamName.innerHTML = joinedRow.team.Name;

        row.appendChild(carNum);
        row.appendChild(driverName);
        row.appendChild(teamName);

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
const globalScope = new Tracks();
