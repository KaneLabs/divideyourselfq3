var express = require("express"),
  router = express.Router(),
  knex = require('../db/knex');

// router.get("/:state", (req, res) => {});

router.post("/locations", (req, res) => {
  var obj = req.body;
  console.log(obj);
  knex("posts")
    .where("lat", ">", obj.minLat)
    .andWhere("lat", "<", obj.maxLat)
    .andWhere("lng", ">", obj.minLng)
    .andWhere("lng", "<", obj.maxLng)
    .then(data => {
      if(!data.length) res.json({message: "no posts in area"});
      console.log(data);
      res.json({posts: data});
    });
});

// obj {minLng, minLat, maxLng, maxLat}
function getCityData(obj){
  return {
    state: obj.state,
    city: obj.city,
    posts: [
      {title: "Good Picture", type: "image", url: "https://source.unsplash.com/featured/?nature,water", points: 2, username: "Alex", usertribe: "Okok", content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},
      {title: "Super Image", type: "image", url: "https://source.unsplash.com/featured/?nature,mountain", points: 5, username: "Bill", usertribe: "Okok", content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
      {title: "Okay Shot", type: "image", url: "https://source.unsplash.com/featured/?nature,forest", points: 10, username: "Carol", usertribe: "Okok", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
      {title: "Worthy View", type: "image", url: "https://source.unsplash.com/featured/?nature,ocean", points: 8, username: "White", usertribe: "Nah", content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
    ]
  }
}

module.exports = router;
