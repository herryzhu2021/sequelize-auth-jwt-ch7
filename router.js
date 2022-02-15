const express = require("express")
const router = require("express").Router();
const auth = require("./controllers/authControllers");
const restrict = require("./middlewares/restrict");

router.get("/", (req, res) => res.render("index"));
router.get("/register", (req, res) => res.render("register"));
router.get("/login", (req, res) => res.render("login"));

router.get("/dashboard", restrict, auth.displayDashboard);
router.get("/createRoom", restrict,(req, res) => res.render("game/createRoom"));
router.get("/mainGame", restrict,(req, res) => res.sendFile(__dirname + "/views/game/traditionalGame.html"));

router.post("/api/v1/auth/register", auth.register);
router.post("/api/v1/auth/login", auth.login);

router.post("/api/v1/auth/createRoom", restrict,auth.createRoom);
router.post("/api/v1/auth/passGameArr", restrict,auth.passGameArr);

router.use("/game", restrict, express.static("views/game"));
router.use((req, res, next) => res.render("404.ejs"));

module.exports = router;
