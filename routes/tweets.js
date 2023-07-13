var express = require("express");
var router = express.Router();

require("../models/connection");
const Tweet = require("../models/tweets");
const { checkBody } = require("../modules/checkBody");
const moment = require("moment");

//Route Post pour publier un Tweet :
router.post("/newtweet", (req, res) => {
  //check if le tweet contient au moins 1 caractère:
  if (!checkBody(req.body, ["content"])) {
    res.json({ result: false, error: "Tweet content is empty" });
    return;
  }

  //définition de la date du tweet avec Moment
  const currentDate = moment().format("YYYY-MM-DD HH:mm");

  const newTweet = new Tweet({
    username: "John", //il faudra modifier ces 2 lignes pour récupérer dynamiquement le username et le firstname.
    firstname: `@JohnCena`,
    content: req.body.content,
    date: currentDate,
    likeCount: 0,
    Image: "../frontend/public/icon.jpg",
  });

  newTweet
    .save()
    .then(() => {
      res.json({ result: true, message: "Tweet posted successfully" });
    })
    .catch((error) => {
      res.json({ result: false, error: error.message });
    });
});

router.delete("/:id", (req, res) => {
  const tweetId = req.params.id;

  // Utilisez la méthode findByIdAndRemove de Mongoose pour supprimer le tweet correspondant à l'ID
  Tweet.findByIdAndRemove(tweetId)
    .then((deletedTweet) => {
      if (deletedTweet) {
        res.json({ result: true, message: "Tweet deleted successfully" });
      } else {
        res.json({ result: false, error: "Tweet not found" });
      }
    })
    .catch((error) => {
      res.json({ result: false, error: error.message });
    });
});

router.put("/:id/like", (req, res) => {
  // Use the findByIdAndUpdate method of Mongoose to update the likeCount of the tweet
  Tweet.findById(req.params.id)
    .then((data) => {
      if (data) {
        data.likeCount += 1; // Incrémentez le champ likeCount de 1
        return data.save(); // Enregistrez les modifications dans la base de données
      }
    })
    .then((data) => {
      res.json({ result: true, tweet: data });
    })
    .catch((error) => {
      res.json({ result: false, error: error.message });
    });
});

router.get("/alltweets", (req, res) => {
  Tweet.find().then((data) => {
    console.log(data);
    res.json({ result: data });
  });
});

module.exports = router;
