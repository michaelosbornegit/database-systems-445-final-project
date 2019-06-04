class Races {
  constructor() {
    const userAction = async () => {
      const response = await fetch('https://osbornem-database-project.herokuapp.com/getraces');
      const myJson = await response.json(); //extract JSON from the http response
      console.log(myJson);
      // do something with myJson
    }

    userAction();
  }
}

// kick off the whole thing
const globalScope = new Races();
