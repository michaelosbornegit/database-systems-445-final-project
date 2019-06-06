// This file contains the javascript logic for the race view inside the nascar app

class Races {
  constructor() {

    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    // call the endpoint for race information
    const userAction = async () => {
      const response = await fetch(proxyUrl + 'https://osbornem-database-project.herokuapp.com/getraces');
      const json = await response.json(); //extract JSON from the http response

      let tableBody = document.getElementById('tableBody');

      let found = false;

      // create the table elements
      json.forEach((joinedRow) => {
        const row = document.createElement('tr');

        sessionStorage.setItem(joinedRow.RACE.RaceID, JSON.stringify(joinedRow));
        sessionStorage.setItem(joinedRow.TRACK.TrackID, JSON.stringify(joinedRow.TRACK));

        row.addEventListener('click', () => {
          sessionStorage.setItem('selectedRace', joinedRow.RACE.RaceID);
          sessionStorage.setItem('selectedTrack', joinedRow.TRACK.TrackID);
          window.location.assign(location.pathname.substring(0, location.pathname.length - 'races.html'.length) + 'single-race-view.html');
        });

        const raceName = document.createElement('td');
        raceName.innerHTML = joinedRow.RACE.Name;

        if (joinedRow.RACE.Name == 'DAYTONA 500') {
          found = true;
        }

        const trackName = document.createElement('td');
        trackName.innerHTML = joinedRow.TRACK.Name;

        const date = document.createElement('td');
        date.innerHTML = new Date(joinedRow.RACE.Date.substring(0, 10)).toDateString();

        row.appendChild(raceName);
        row.appendChild(trackName);
        row.appendChild(date);

        tableBody.appendChild(row);
      });

      if (found) {
        console.log('DAYTONA 500 FOUND! test passed');
      } else {
        console.log('DAYTONA 500 NOT FOUND! TEST FAILED');
      }

      // show the table now that its populated!
      document.getElementById('loading').style.display = 'none'
      document.getElementById('mainContent').style.display = 'block'
    }

    userAction();
  }
}

// kick off the whole thing
const globalScope = new Races();
