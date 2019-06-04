class Races {
  constructor() {

    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    const userAction = async () => {
      const response = await fetch(proxyUrl + 'https://osbornem-database-project.herokuapp.com/getraces');
      const json = await response.json(); //extract JSON from the http response

      let tableBody = document.getElementById('tableBody');
      json.forEach((joinedRow) => {
        const row = document.createElement('tr');

        sessionStorage.setItem(joinedRow.RACE.RaceID, JSON.stringify(joinedRow));

        row.addEventListener('click', () => {
          sessionStorage.setItem('selectedRace', joinedRow.RACE.RaceID);
          window.location.assign(location.pathname.substring(0, location.pathname.length - 'races.html'.length) + 'single-race-view.html');
        });

        const raceName = document.createElement('td');
        raceName.innerHTML = joinedRow.RACE.Name;

        const trackName = document.createElement('td');
        trackName.innerHTML = joinedRow.TRACK.Name;

        const date = document.createElement('td');
        date.innerHTML = new Date(joinedRow.RACE.Date.substring(0, 10)).toDateString();

        row.appendChild(raceName);
        row.appendChild(trackName);
        row.appendChild(date);

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
const globalScope = new Races();
