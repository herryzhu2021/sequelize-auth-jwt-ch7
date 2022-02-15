const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser")
const session = require("express-session");
const flash = require("express-flash");
const { PORT = 3000 } = process.env;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser())

app.use(
  session({
    secret: "herry123",
    resave: false,
    saveUninitialized: false,
  })
);

const passport = require("./lib/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.set("view engine", "ejs");

const router = require("./router");
app.use(router);

app.listen(PORT, () => {
  console.log(`Server nyala di port ${PORT}`);
});
