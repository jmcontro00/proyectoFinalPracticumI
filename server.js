const express = require("express");
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('SDVR'));

app.use('/public', express.static('public'));
app.use('/public2', express.static('public2'));
const PORT = process.env.PORT || 4000;

const initializePassport = require("./passportConfig");

initializePassport(passport);
// routes
app.use(require('./routes/index'));
// Middleware

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use(
    session({

        secret: 'secretidhere',

        resave: false,

        saveUninitialized: false
    })
);

app.use(passport.initialize());

app.use(passport.session());
app.use(flash());

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/users/login", checkAuthenticated, (req, res) => {
    console.log(req.session.flash.error);
    res.render("login.ejs");
});

app.get("/users/dashboard", checkNotAuthenticated, (req, res) => {
    console.log(req.isAuthenticated());
    res.render("dashboard", { user: req.user.persona_nombre });
});

app.get("/users/votar", checkAuthenticated, (req, res) => {
    console.log(req.isAuthenticated());
    res.render("votar.ejs");
});

app.get("/users/votaciones", checkAuthenticated, (req, res) => {
    console.log(req.session.flash.error);
    res.render("votaciones.ejs");
});

app.get("/users/index", checkAuthenticated, (req, res) => {
    console.log(req.session.flash.error);
    res.render("index.ejs");
});

app.get("/users/boletamunicipal", checkNotAuthenticated, (req, res) => {
    console.log(req.session.flash.error);
    res.render("boletamunicipal.ejs");
});

app.get("/users/boletagob", checkNotAuthenticated, (req, res) => {
    console.log(req.session.flash.error);
    res.render("boletagob.ejs");
});

app.get("/users/boletarep", checkNotAuthenticated, (req, res) => {
    console.log(req.session.flash.error);
    res.render("boletarep.ejs");
});

app.get("/users/votar", checkNotAuthenticated, (req, res) => {
    console.log(req.session.flash.error);
    res.render("votar.ejs");
});

app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

app.post(
    "/users/login",
    passport.authenticate("local", {
        successRedirect: "/users/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true
    })
);

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/users/dashboard");
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/users/login");
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});