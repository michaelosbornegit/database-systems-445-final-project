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

        const shape = document.createElement('td');
        shape.innerHTML = joinedRow.Shape;

        row.appendChild(state);
        row.appendChild(trackName);
        row.appendChild(shape);

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
