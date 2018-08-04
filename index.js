const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');
require('./models/Users');
require('./services/passport'); // order of require matter

mongoose.connect(keys.mongoURI);

const app = express();

app.use(cookieSession({
	maxAge: 30 * 60 * 60 * 1000,
	keys: [keys.cookieKey],
})
);
app.use(passport.initialize()).use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
