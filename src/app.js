const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./Utils/geocode");
const forecast = require("./Utils/forecast");

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'))

const app = express();

// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve.
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Manish Bisht",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Manish Bisht",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "If you have any query you can mail me at. manish01.it@gmail.com",
    title: "Help",
    name: "Manish Bisht",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
  
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

// It watch macthing pages after help page.
app.get("/help/*", (req, res) => {
  // res.send("help article not found");
  res.render("404", {
    title: "404",
    name: "Manish Bisht",
    errorMessage: "Help article not found",
  });
});

// * this means match anything that can't match. (Wildcar Character)
app.get("*", (req, res) => {
  // res.send("404 Page");
  res.render("404", {
    title: " 404 error",
    name: "Manish Bisht",
    errorMessage: "Page not found!",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
