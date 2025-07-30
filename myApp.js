let express = require('express');
require('dotenv').config();
let bodyParser = require('body-parser');
let app = express();

// Middleware first
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(__dirname + "/public"));

app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get('/now', 
  function(req, res, next) {
    req.time = new Date().toString(); // Add current time to request object
    next(); // Pass control to the next handler
  }, 
  function(req, res) {
    res.json({ time: req.time }); // Send JSON response
  }
);

// /name route (GET + POST combined)
app.route('/name')
  .get(function(req, res) {
    const firstName = req.query.first;
    const lastName = req.query.last;
    res.json({ name: `${firstName} ${lastName}` });
  })
  .post(function(req, res) {
    const firstName = req.body.first;
    const lastName = req.body.last;
    res.json({ name: `${firstName} ${lastName}` });
  });

// Serve index.html
let absolutePath = __dirname + "/views/index.html";
app.get("/", function(req, res) {
  res.sendFile(absolutePath);
});

// JSON route
app.get("/json", function(req, res) {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message: message });
});

// /now route
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({ time: req.time });
});

// /:word/echo route
app.get('/:word/echo', function(req, res) {
  const word = req.params.word;
  res.json({ echo: word });
});

module.exports = app;




































 module.exports = app;
