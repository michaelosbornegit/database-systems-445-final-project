// This file is the javascript logic for the homepage of the app.

class Index {
  constructor() {
    // add a listener to the button to validate input then send a query with
    // the comment information to the database
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

    // call the web service to load the previous comments
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    fetch(proxyUrl + 'https://osbornem-database-project.herokuapp.com/getcomments')
      .then(response => response.json())
      .then(response => {
        response.reverse();
        let found = false;
        response.forEach(row => {
          // set up the HTML for a single card response
          let divRow = document.createElement("div");
          divRow.className = 'row';

          let col = document.createElement("div");
          col.className = 'col s12';

          let divCard = document.createElement("div");
          divCard.className = 'card blue-grey darken-2';

          let cardContent = document.createElement("div");
          cardContent.className = 'card-content white-text';

          let nameTitle = document.createElement('span');
          nameTitle.className = 'card-title';
          nameTitle.innerHTML = 'Name:  ' + row.Name;

          // test case
          if (row.Name == 'hello world') {
            found = true;
          }

          let favDriver = document.createElement('p');
          favDriver.innerHTML = 'Favorite Driver:  ' + row.FavoriteRacer;

          let comments = document.createElement('p');
          comments.innerHTML = 'Comments:  ' + row.Comments;

          cardContent.appendChild(nameTitle);
          cardContent.appendChild(favDriver);
          cardContent.appendChild(comments);
          divCard.appendChild(cardContent);
          col.appendChild(divCard);
          divRow.appendChild(col);
          document.getElementById('response-area').appendChild(divRow);
        });

        // test case
        if (found) {
          console.log('comment hello world FOUND, test case passed!');
        } else {
          console.log('comment hello world NOT FOUND, TEST CASE FAILED!');
        }


        // show the table now that its populated!
        document.getElementById('loading').style.display = 'none'
        document.getElementById('comment_content').style.display = 'block'
      });
  }
}

// only run after the window was loaded to avoid race conditions
window.onload = () => {
  const globalScope = new Index();
}
