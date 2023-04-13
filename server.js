// Set up jargon
const express = require("express");
const createError = require("http-errors");
const path = require("path");
// const logger = require("morgan");
const app = express();
const dotenv = require("dotenv");
const { auth, requiresAuth } = require("express-openid-connect");
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { timeOfDay } = require('./public/scripts/indexHandler.js')

// app.use(logger("dev"));

// Templating for pug:
app.set("views", "./public/views");
app.set("view engine", "pug");
app.use(express.static('./public'));

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:3000",
  clientID: "fKMdzf0pdV2nymZRYKKkHGBCQzk5iwe0",
  issuerBaseURL: "https://dev-7ftej7mhmc6epege.us.auth0.com",
};

const port = process.env.PORT || 3000;
if (
  !config.baseURL &&
  !process.env.BASE_URL &&
  process.env.PORT &&
  process.env.NODE_ENV !== "production"
) {
  config.baseURL = `https://localhost:${port}`;
}

app.use(auth(config));

app.use((req, res, next) => {
  res.locals.user = req.oidc.user;
  next();
});

// Mongo:
const db = require("./models/mongoose");
const UserModel = require("./models/UserModel");
const UserCrud = require("./models/userModelCrud");

var userFromDb = null;
var getUser;


const router = require("express").Router();
/**
 * @desc Home Route.  Renders index.pug if user is logged in or login.pug if not
 */
app.get("/", async (req, res) => {
  // Check if user is logged in!

  userFromDb = await getUser(req);
  if (userFromDb === null) {
    res.render("login", {
      title: "Scheduled Motivation",
    });
  } else {

    res.render("index", {
      title: "Scheduled Motivation",
      pageTitle: userFromDb.given_name,
      navbarTitle: "Home",
      timeOfDay: timeOfDay(),
      user: userFromDb
    });
  }
});

app.get("/play", (req, res) => {
  res.render("play", { pageTitle: "Play Videos" });
});

app.get("/new_video", async (req, res) => {
  // const pageTitle = 'New Video';
  if(userFromDb === null) userFromDb = await getUser(req);

  console.log("This is userFromDb: " + userFromDb);
  res.render("new_video", { pageTitle: "New Video", user: userFromDb });
});

app.get("/new_collection", (req, res) => {

  res.render("new_collection", { pageTitle: "New Collection", user: userFromDb });

});
app.post("/new_collection", async (req, res) => {
  const formData = req.body

  console.log("Adding a new Collection:", formData);
  await UserCrud.createCollection(userFromDb, formData, videoData);
  res.render("new_video", { pageTitle: "New Video", user: userFromDb })

})

app.post("/new_video", async (req, res) => {
  const formData = req.body;
  console.log("Adding new video: ", formData);
  if(UserCrud.extractYoutubeVideoId(formData.url) === null) {
    res.render("new_video", { pageTitle: "Fix URL to add video", user: userFromDb})
  }
  else if(formData.collection === 'new_collection') {
    res.render("new_collection",
      { pageTitle: "New Collection", user: userFromDb, videoData: formData})
  }
  else {
    await UserCrud.addNewVideo(userFromDb, formData);
    res.render("index", {
      title: "Scheduled Motivation",
      pageTitle: userFromDb.given_name,
      navbarTitle: "Home",
      timeOfDay: timeOfDay(),
      user: userFromDb
    });
  }
})

app.listen(port, () => {
  console.log(`scheduled_motivation app listening on port ${port}`);
});

module.exports = app;

async function getUser(request) {
  if (request.oidc.isAuthenticated()) {
    const user = request.oidc.user;
    let dbUser = await UserCrud.userExists(user);
    if (dbUser === null) {
      dbUser = await UserCrud.createUser(user);
    }
    return dbUser;
  } else {
    return null;
  }
}
