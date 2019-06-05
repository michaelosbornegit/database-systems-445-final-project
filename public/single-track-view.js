class SingleTrackView {
  constructor() {
    const data = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('selectedTrack')));
    document.getElementById('trackName').innerHTML = data.Name;
    document.getElementById('state').innerHTML = data.State;
    document.getElementById('owner').innerHTML = data.Owner;
    document.getElementById('shape').innerHTML = data.Shape;
    document.getElementById('surface').innerHTML = data.Surface;
    document.getElementById('type').innerHTML = data.Type;
    document.getElementById('frontstretch').innerHTML = data.FrontStretch;
    document.getElementById('backstretch').innerHTML = data.BackStretch;
    document.getElementById('distance').innerHTML = data.Distance;
  }
}

window.onload = () => {
  const globalScope = new SingleTrackView();
}
