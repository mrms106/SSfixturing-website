if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const express = require("express");
const path = require("path");
const port = 8080;
const app = express();
const methodOverride = require("method-override");
const fs = require('fs');
const User = require("./modules/user");
const session = require("express-session");
const sequelize = require('./db');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const LocalStrategy = require('passport-local').Strategy;
const contactus = require("./router/contactus");
const pdfrouter = require("./router/pdf");
const userrouter = require("./router/user");
const otprouter = require("./router/otp");

const flash = require("connect-flash");
const bodyParser = require("body-parser");
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
};

// Use CORS middleware
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

// database
sequelize.sync().then(() => {
  console.log('Database & tables created!');
}).catch(err => {
  console.error('Error creating database & tables:', err);
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Initialize Sequelize Store
const sessionStore = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 10 * 24 * 60 * 1000, 
  expiration: 1 * 60 * 60 * 1000, 
});

// Configure session middleware
app.use(session({
  secret: process.env.SECRET || 'defaultsecret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1 * 60 * 60 * 1000, // 1 hour
    httpOnly: true, // Ensures the cookie is sent only over HTTP(S), not client JavaScript
    // secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent only over HTTPS
    sameSite: 'strict' // Helps mitigate CSRF attacks
  }
}));

// Sync the session store
sessionStore.sync();

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// getting current user
app.use((req, res, next) => {
  res.locals.currUser = req.user || null;
  next();
});

// Set up your routes as API endpoints
app.use("/api", contactus);
app.use("/api", pdfrouter);
app.use("/api", userrouter);
app.use( "/api",otprouter);




app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((err, req, res, next) => {
  let { statuscode = 500, message = "Something went wrong" } = err;
  res.status(statuscode).json({ error: message });
});

app.listen(port, () => {
  console.log("The port is working", port);
});

