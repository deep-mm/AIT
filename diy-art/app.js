// Full Documentation - https://www.turbo360.co/docs
const firebase = require("firebase");
require("firebase/auth");
require("firebase/database");
require("firebase/firestore");

const config = {
	apiKey: "AIzaSyBvkSwewV6w7MA86TPMh-Tg0HDk9_TGfiY",
	authDomain: "diy-market-f233d.firebaseapp.com",
	databaseURL: "https://diy-market-f233d.firebaseio.com",
	storageBucket: "diy-market-f233d.appspot.com",
};
firebase.initializeApp(config);

const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const app = vertex.express();// initialize app
// import routes
const index = require('./routes/index');
// set routes
app.use('/', index);

module.exports = app;
