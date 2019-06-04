class SingleRaceView {
  constructor() {
    const data = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('selectedRace')));
    document.getElementById('raceName').innerHTML = data.RACE.Name;
    document.getElementById('date').innerHTML = new Date(data.RACE.Date.substring(0, 10)).toDateString();
    document.getElementById('trackName').innerHTML = data.TRACK.Name;
    document.getElementById('laps').innerHTML = data.RACE.Laps;
    document.getElementById('elapsedTime').innerHTML = data.RACE.ElapsedTime;
    document.getElementById('leadChanges').innerHTML = data.RACE.LeadChanges;
    document.getElementById('victoryMargin').innerHTML = data.RACE.VictoryMargin;
    document.getElementById('averageSpeed').innerHTML = data.RACE.AverageSpeed;
    document.getElementById('comments').innerHTML = data.RACE.Comments;
  }
}

window.onload = () => {
  const globalScope = new SingleRaceView();
}
