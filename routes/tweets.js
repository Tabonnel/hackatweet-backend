var express = require("express");
var router = express.Router();

require("../models/connection");
const Tweet = require("../models/tweets");
const { checkBody } = require("../modules/checkBody");

//Route Post pour publier un Tweet :
router.post("/postTweet", (req, res) => {

    //check if le tweet contient au moins 1 caractère: 
  if (!checkBody(req.body, ["content"])) {
    res.json({ result: false, error: "Tweet content is empty" });
    return;
  }
  
  //

});

module.exports = router;
