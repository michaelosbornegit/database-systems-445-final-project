// this file contains the javascript logic to display information about a single track in the nascar app

class SingleTrackView {
  constructor() {
    const data = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('selectedTrack')));
    // populate fields
    console.log(data);
    document.getElementById('trackName').innerHTML = data.Name;
    document.getElementById('state').innerHTML = data.State;
    document.getElementById('owner').innerHTML = data.Owner;
    document.getElementById('shape').innerHTML = data.Shape;
    document.getElementById('surface').innerHTML = data.Surface;
    document.getElementById('type').innerHTML = data.TrackType;
    document.getElementById('frontstretch').innerHTML = data.FrontStretch;
    document.getElementById('backstretch').innerHTML = data.Backstretch;
    document.getElementById('distance').innerHTML = data.Distance;
  }
}

// only start after loading to avoid race conditions
window.onload = () => {
  const globalScope = new SingleTrackView();
}
