class Index {
  constructor() {
    document.getElementById('submitButton').addEventListener('click', () => {
      let name = document.getElementById('name_input');
      let favDriver = document.getElementById('driver_input');
      let comment = document.getElementById('comments_input');
      console.log('fjdsklafj');
      if (name.value.length <= 40 && favDriver.value.length <= 40 && comment.value.length <= 225) {
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl + 'https://osbornem-database-project.herokuapp.com/postcomment', {
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
              // const row = document.createElement('tr');
              //
              // row.addEventListener('click', () => {
              //   sessionStorage.setItem('selectedRace', joinedRow.RACE.RaceID);
              //   sessionStorage.setItem('selectedTrack', joinedRow.TRACK.TrackID);
              //   window.location.assign(location.pathname.substring(0, location.pathname.length - 'races.html'.length) + 'single-race-view.html');
              // });
              //
              // const place = document.createElement('td');
              // place.innerHTML = joinedRow.result.FinishPosition;
              //
              // const driver = document.createElement('td');
              // driver.innerHTML = joinedRow.driver.FirstName + ' ' + joinedRow.driver.LastName;
              //
              // const number = document.createElement('td');
              // number.innerHTML = joinedRow.car.Number;
              //
              // const startPos = document.createElement('td');
              // startPos.innerHTML = joinedRow.result.StartPosition;
              //
              // const bestLapTime = document.createElement('td');
              // bestLapTime.innerHTML = joinedRow.result.BestLapTime;
              //
              // const bestLapSpeed = document.createElement('td');
              // bestLapSpeed.innerHTML = joinedRow.result.BestLapSpeed;
              //
              // const points = document.createElement('td');
              // points.innerHTML = joinedRow.result.Points;
              //
              // const finishStatus = document.createElement('td');
              // finishStatus.innerHTML = joinedRow.result.FinishStatus;
              //
              // const lapsComplete = document.createElement('td');
              // lapsComplete.innerHTML = joinedRow.result.LapsCompleted;
              //
              // row.appendChild(place);
              // row.appendChild(driver);
              // row.appendChild(number);
              // row.appendChild(startPos);
              // row.appendChild(bestLapTime);
              // row.appendChild(bestLapSpeed);
              // row.appendChild(points);
              // row.appendChild(finishStatus);
              // row.appendChild(lapsComplete);
              //
              // tableBody.appendChild(row);

              console.log(joinedRow);
            });



            // show the table now that its populated!
            document.getElementById('loading').style.display = 'none'
            document.getElementById('mainContent').style.display = 'block'
          }).catch(error => console.error('error: ', error));
      }
      }
    })
  }
}

window.onload = () => {
  const globalScope = new Index();
}
