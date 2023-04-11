// Set up jargon
const express = require("express");
const createError = require("http-errors");
const path = require("path");
// const logger = require("morgan");
const app = express();
const dotenv = require("dotenv");
// const { auth, requiresAuth } = require("express-openid-connect");
dotenv.config();

// app.use(logger("dev"));

// Templating for pug:
app.set("views", "./public/views");
app.set("view engine", "pug");
app.use(express.static('./public'))
// Bootstrap:
// const bootstrap = require('bootstrap');
// const mdb = require('mdb-ui-kit');

const config = {
    authRequired: false,
    auth0Logout: true
}

const port = process.env.PORT || 3000;
if(!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
    config.baseURL = `http://localhost:${port}`;
}

// app.use(auth(config))

// app.use((req, res, next) => {
//     res.locals.user = req.oidc.user;
//     next();
// })


// Mongo:
// const db = require('./models/mongoose');
// const CollectionModel = require('./models/CollectionModel')
// const UserModel = require('./models/UserModel')


const router = require('express').Router();
/**
 * @desc Home Route.  Renders index.pug if user is logged in or login.pug if not
 */
app.get('/', (req, res) => {
    // Check if user is logged in!
    // if(req.oidc.isAuthenticated()){
    //     res.render('index', {
    //         title: 'Scheduled Motivation',
    //         navbarTitle: 'Home'
    //     })
    // } else {
        res.render('login', { pageTitle: 'Login'})
    // }


})

app.get('/new_video', (req, res) => {
    // const pageTitle = 'New Video';
    res.render('new_video', { pageTitle: 'New Video'});
})

app.get("/new_collection", (req, res) => {
    res.render('new_collection', { pageTitle: 'New Collection'});
})

app.listen(port, () => {
    console.log(`scheduled_motivation app listening on port ${port}`);
})

module.exports = app;
