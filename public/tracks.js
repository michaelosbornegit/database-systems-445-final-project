// This file contains the javascript logic for the track display in the NASCAR app

class Tracks {
  constructor() {

    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    // call endpoint to get track information
    const userAction = async () => {
      const response = await fetch(proxyUrl + 'https://osbornem-database-project.herokuapp.com/gettracks');
      const json = await response.json(); //extract JSON from the http response

      let tableBody = document.getElementById('tableBody');

      let found = false;

      json.forEach((joinedRow) => {
        const row = document.createElement('tr');

        sessionStorage.setItem(joinedRow.TrackID, JSON.stringify(joinedRow));

        row.addEventListener('click', () => {
          sessionStorage.setItem('selectedTrack', joinedRow.TrackID);
          // console.log(location.pathname.substring(0, location.pathname.length - 'cars.html'.length));
          window.location.assign(location.pathname.substring(0, location.pathname.length - 'tracks.html'.length) + 'single-track-view.html');
        });

        const state = document.createElement('td');
        state.innerHTML = joinedRow.State;

        const trackName = document.createElement('td');
        trackName.innerHTML = joinedRow.Name;

        if (joinedRow.Name == 'ISM Raceway') {
          found = true;
        }

        const shape = document.createElement('td');
        shape.innerHTML = joinedRow.Shape;

        row.appendChild(state);
        row.appendChild(trackName);
        row.appendChild(shape);

        tableBody.appendChild(row);
      });

      if (found) {
        console.log('ISM Raceway FOUND! test passed');
      } else {
        console.log('ISM Raceway NOT FOUND! TEST FAILED');
      }

      // show the table now that its populated!
      document.getElementById('loading').style.display = 'none'
      document.getElementById('mainContent').style.display = 'block'
    }

    userAction();
  }
}

// kick off the whole thing
const globalScope = new Tracks();
