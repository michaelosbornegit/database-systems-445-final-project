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
              name: name.value,
              favDriver: favDriver.value,
              comment: comment.value,
            }),
          }).then(response => {
            document.location.reload();
          }).catch(error => console.error('error: ', error));
      }
    });

    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    fetch(proxyUrl + 'https://osbornem-database-project.herokuapp.com/getcomments')
    .then(response => {
      console.log(response);
    });
  }
}


window.onload = () => {
  const globalScope = new Index();
}
