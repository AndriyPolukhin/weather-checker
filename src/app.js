// Dependencies
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Call the express function
const app = express();

// Defined path for express  configs
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set the template engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup to serve the static assets
app.use(express.static(publicDirectoryPath));

// Set up a route
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Andriy Polukhin'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    cool: 'Yes',
    name: 'Andriy Polukhin'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text',
    name: 'Andriy Polukhin',
    title: 'Help me'
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: 'You need to provide an address'
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({ error });

      console.log(location);
      console.log(forecastData);

      res.send({
        forecast: forecastData,
        location,
        address
      });
    });
  });
});

//
// Goal: Update the weather endpoint to accept address
//
// 1. No address? Send back an error message
// 2. Address? Send back the static JSON
// - Add address property onto JSON which returns the provided address
// 3. Test /weather and /weather?address=Hamburg

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help article not found',
    name: 'Andriy Polukhin',
    msg: 'Please check the article name your entering'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Page not found',
    name: 'Andriy Polukhin',
    msg: 'Please check the url link your entering'
  });
});

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
