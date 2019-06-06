// this file contains the javascript logic to display the information for a single race

class SingleRaceView {
  constructor() {
    const data = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('selectedRace')));

    // add listener to button to view track info
    document.getElementById('trackButton').addEventListener('click', () => {
      window.location.assign(location.pathname.substring(0, location.pathname.length - 'single-race-view.html'.length) + 'single-track-view.html');
    });

    // populate fields
    document.getElementById('raceName').innerHTML = data.RACE.Name;
    document.getElementById('date').innerHTML = new Date(data.RACE.Date.substring(0, 10)).toDateString();
    document.getElementById('trackName').innerHTML = data.TRACK.Name;
    document.getElementById('laps').innerHTML = data.RACE.Laps;
    document.getElementById('elapsedTime').innerHTML = data.RACE.ElapsedTime;
    document.getElementById('leadChanges').innerHTML = data.RACE.LeadChanges;
    document.getElementById('victoryMargin').innerHTML = data.RACE.VictoryMargin;
    document.getElementById('averageSpeed').innerHTML = data.RACE.AverageSpeed;
    document.getElementById('comments').innerHTML = data.RACE.Comments;

    // access endpoint for racer result information
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
        response.forEach((joinedRow) => {
          const row = document.createElement('tr');

          row.addEventListener('click', () => {
            sessionStorage.setItem('selectedRace', joinedRow.RACE.RaceID);
            sessionStorage.setItem('selectedTrack', joinedRow.TRACK.TrackID);
            window.location.assign(location.pathname.substring(0, location.pathname.length - 'races.html'.length) + 'single-race-view.html');
          });

          // populate table with recieved values
          const place = document.createElement('td');
          place.innerHTML = joinedRow.result.FinishPosition;

          const driver = document.createElement('td');
          driver.innerHTML = joinedRow.driver.FirstName + ' ' + joinedRow.driver.LastName;

          const number = document.createElement('td');
          number.innerHTML = joinedRow.car.Number;

          const startPos = document.createElement('td');
          startPos.innerHTML = joinedRow.result.StartPosition;

          const bestLapTime = document.createElement('td');
          bestLapTime.innerHTML = joinedRow.result.BestLapTime;

          const bestLapSpeed = document.createElement('td');
          bestLapSpeed.innerHTML = joinedRow.result.BestLapSpeed;

          const points = document.createElement('td');
          points.innerHTML = joinedRow.result.Points;

          const finishStatus = document.createElement('td');
          finishStatus.innerHTML = joinedRow.result.FinishStatus;

          const lapsComplete = document.createElement('td');
          lapsComplete.innerHTML = joinedRow.result.LapsCompleted;

          row.appendChild(place);
          row.appendChild(driver);
          row.appendChild(number);
          row.appendChild(startPos);
          row.appendChild(bestLapTime);
          row.appendChild(bestLapSpeed);
          row.appendChild(points);
          row.appendChild(finishStatus);
          row.appendChild(lapsComplete);

          tableBody.appendChild(row);

          console.log(joinedRow);
        });


        // show the table now that its populated!
        document.getElementById('loading').style.display = 'none'
        document.getElementById('mainContent').style.display = 'block'
      }).catch(error => console.error('error: ', error));
  }
}

// only execute after loading to avoid race conditions
window.onload = () => {
  const globalScope = new SingleRaceView();
}
