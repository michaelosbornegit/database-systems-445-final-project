class SingleRaceView {
  constructor() {
    const data = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('selectedRace')));

    document.getElementById('trackButton').addEventListener('click', () => {
      window.location.assign(location.pathname.substring(0, location.pathname.length - 'single-race-view.html'.length) + 'single-track-view.html');
    });

    document.getElementById('raceName').innerHTML = data.RACE.Name;
    document.getElementById('date').innerHTML = new Date(data.RACE.Date.substring(0, 10)).toDateString();
    document.getElementById('trackName').innerHTML = data.TRACK.Name;
    document.getElementById('laps').innerHTML = data.RACE.Laps;
    document.getElementById('elapsedTime').innerHTML = data.RACE.ElapsedTime;
    document.getElementById('leadChanges').innerHTML = data.RACE.LeadChanges;
    document.getElementById('victoryMargin').innerHTML = data.RACE.VictoryMargin;
    document.getElementById('averageSpeed').innerHTML = data.RACE.AverageSpeed;
    document.getElementById('comments').innerHTML = data.RACE.Comments;

    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    fetch(proxyUrl + 'https://osbornem-database-project.herokuapp.com/getraceresults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          raceID: data.RACE.RaceID,
        }),
      }).then(response => response.json())
      .then(response => {
        console.log(response);
        // show the table now that its populated!
        document.getElementById('loading').style.display = 'none'
        document.getElementById('mainContent').style.display = 'block'
      }).catch(error => console.error('error: ', error));
  }
}

window.onload = () => {
  const globalScope = new SingleRaceView();
}
