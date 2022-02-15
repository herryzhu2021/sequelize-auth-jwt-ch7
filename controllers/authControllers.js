const { User, room, game_history } = require('../models')
const passport = require('../lib/passport')
const jwt = require("jsonwebtoken");

var roomName = '';

function format(user) {
  const { id, username } = user
  return {
    id,
    username,
    accessToken: user.generateToken(),
  }
}

module.exports = {
  register: (req, res, next) => {
    User.register(req.body)
      .then(() => {
        res.redirect('/login')
      })
      .catch((err) => {
        let messages = {}
        messages.error = "Username already exist in database";
        res.render("register", { messages })
      })
  },

  login: (req, res) => {
    User.authenticate(req.body).then((user) => {
      const token = format(user).accessToken

      res.cookie("token", token, {
        httpOnly: true,
      })
      res.redirect('/dashboard')
    })
    .catch((err) => {
      let messages = {}
      messages.error = "Wrong Credential";
      res.render("login", { messages })
  
    })
  },
  //display dynamic dashboard of the login user 
  displayDashboard: (req, res) => {
    const token = req.cookies.token
	
	  const payload = jwt.verify(token, "Ini rahasia")
    const { id, username } = payload

    game_history.findAll({
      where: {UserId : id},
      include: [{ model: room, as: 'room' }],
      order: [ [ 'createdAt', 'DESC' ]],
    })
    .then(z=> {
      res.render("game/index",{ username, z })
    })
  },

  //create Room and render the RPS game page
  createRoom: (req, res) => {
    console.log("nama kamar yang bagus "+req.body.roomname);
    roomName = req.body.roomname
    res.redirect("/game")
  },

  passGameArr: (req, res) => {
    const coba2 = req.body['resulta[]'];
    let winCount = 0;
    let lostCount = 0;
    let drawCount = 0;
    
    const token = req.cookies.token
	
	  const payload = jwt.verify(token, "Ini rahasia")
    const { id } = payload
    
    coba2.forEach(element => {
      console.log(element)
      if(element == 'win'){
        winCount++;
      }
      if(element == 'draw'){
        drawCount++;
      }
      if(element == 'lost'){
        lostCount++;
      }
    });

    room.create({
        room_name : roomName,
        win : winCount,
        draw: drawCount,
        lose : lostCount
    })
    .then(x=> {
        let userScore = 0

        game_history.findOne({
          where: {UserId : id},
          order: [ [ 'createdAt', 'DESC' ]],
        })
        .then(z=> {
            if(z){
              userScore=z.dataValues.score
            }
            let currentResult = (winCount - lostCount)*10;
            userScore += currentResult
              
            game_history.create({
              score : userScore,
              UserId : id,
              roomId: x.dataValues.id
            })
            .then(y=> {
                console.log(y);
                res.redirect('/dashboard')
            })
        })
    })
  },
}
