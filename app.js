// we require express
const express = require('express');
// and execute it as a function in the app variable
const app = express();

// then make view engine settings
app.set('view engine', 'pug');
app.set('views', './views');

// and use public directory as our static assets folder
app.use('/static', express.static('public'));

// I decided I want a separate routing file
const routes = require('./router');
// so I use it
app.use(routes);

// and finally listen on port 3000
app.listen(3000, () => {
  // and print a message if everything is successful
  console.log('Up and running at localhost, port 3000!');
});