class Races {
  constructor() {
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    const userAction = async () => {
      const response = await fetch(proxyUrl + 'https://osbornem-database-project.herokuapp.com/getraces');
      const json = await response.json(); //extract JSON from the http response

      let tableBody = document.getElementById('tableBody');
      json.forEach((race) => {
        const row = document.createElement('tr');

        const name = document.createElement('td');
        name.innerHTML = race.Name;

        const date = document.createElement('td');
        date.innerHTML = new Date(race.Date).toDateString();

        row.appendChild(name);
        row.appendChild(date);

        tableBody.appendChild(row);
      });

      // do something with myJson
    }

    userAction();
  }
}

// kick off the whole thing
const globalScope = new Races();
