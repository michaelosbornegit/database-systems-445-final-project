const express = require('express')
const app = express()
const port = process.env.port || 3000;

app.get('/', (req, res) => res.send('Hello World!'))

/*
 * Heroku will assign a port you can use via the 'PORT' environment variable
 * To accesss an environment variable, use process.env.<ENV>
 * If there isn't an environment variable, process.env.PORT will be null (or undefined)
 * If a value is 'falsy', i.e. null or undefined, javascript will evaluate the rest of the 'or'
 * In this case, we assign the port to be 5000 if the PORT variable isn't set
 * You can consider 'let port = process.env.PORT || 5000' to be equivalent to:
 * let port; = process.env.PORT;
 * if(port == null) {port = 5000}
 */
app.listen(process.env.PORT || 5000, () => {
  console.log("Server up and running on port: " + (process.env.PORT || 5000));
});
