class Races {
  constructor() {
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    const userAction = async () => {
      const response = await fetch(proxyUrl + 'https://osbornem-database-project.herokuapp.com/getraces');
      const json = await response.json(); //extract JSON from the http response

      let tableBody = document.getElementById('tableBody');
      json.forEach((joinedRow) => {
        const row = document.createElement('tr');

        const raceName = document.createElement('td');
        raceName.innerHTML = joinedRow.RACE.Name;

        const trackName = document.createElement('td');
        trackName.innerHTML = joinedRow.TRACK.Name;

        const date = document.createElement('td');
        date.innerHTML = new Date(joinedRow.RACE.Date).toDateString();

        row.appendChild(raceName);
        row.appendChild(trackName);
        row.appendChild(date);

        tableBody.appendChild(row);

        console.log(joinedRow);
      });

      // do something with myJson
    }

    userAction();
  }
}

// kick off the whole thing
const globalScope = new Races();
