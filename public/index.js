class Index {
  constructor() {
    document.getElementById('submitButton').addEventListener('click', () => {
      let name = document.getElementById('name_input').value;
      let favDriver = document.getElementById('driver_input').value;
      let comment = document.getElementById('comments_input').value;
      if (name.length <= 40 && favDriver.length <= 40 && comment.length <= 225) {

      }
    })
  }
}

window.onload = () => {
  const globalScope = new Index();
}
