const express = require('express');
const app = express();

const data = require('./data.json');
const { projects } = data;


app.set("view engine", "pug");
app.use('/static', express.static('public'));
app.use('/static', express.static('images'));


// routing to index page
app.get('/', (req, res, next) => {
  res.render('index', { projects:projects });
});

//route to about page
app.get('/about', (req, res, next) => {
  res.render('about');
});

// creating route to projects page
app.get('/project/:id', (req, res) => res.render('project', {
  title: projects[req.params.id].project_name,
  description: projects[req.params.id].description,
  technologies: projects[req.params.id].technologies,
  liveLink: projects[req.params.id].live_link,
  githubLink: projects[req.params.id].github_link,
  image: projects[req.params.id].image_urls
}));

// catching 404 errors
app.use((req, res, next) => {
  let err = new Error();
  err.status = 404;
  err.message = "Sorry. Page Not Found :/";
  next(err);
});

// error handling
app.use((err, req, res, next) => {
  if(!err.status){
    err.status = 500;
    err.message = "Sorry. An Error Occurred :/";
  }
  res.locals.error = err;
  res.status(err.status);
  res.send('This page does not exist');
});
// and finally listen on port 3000
app.listen(3000, () => {
  // and print a message if everything is successful
  console.log('Up and running at localhost, port 3000!');
});