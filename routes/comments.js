var express = require("express"),
  router = express.Router(),
  knex = require('../db/knex');

router.post("/create", (req, res) => {
  knex("comments")
    .insert({
      user_id: req.body.user_id,
      post_id: req.body.post_id,
      comment: req.body.comment,
      timestamp: req.body.timestamp,
      points: 1
    })
    .returning('id')
    .then((data) => {
      console.log(data);
      res.send(data)
    })
});

// router.post("/update", (req, res) => {
//   if(!req.headers.authorization) return res.json({success: false, message: "no header"});
//   var token = req.headers.authorization.split(' ')[1];
//   if(!token) return res.json({success: false, message: "no token"});
//   jwt.verify(token, process.env.SECRET, (err, data) => {
//     if(err) return res.json({success: false, message: "error parsing token"});
//     if(data.user.id !== req.body.user_id) return res.json({success: false, message: "wrong user"});
//     knex("comments")
//       .where("id", req.body.id)
//       .update(req.body)
//       .then(() => res.json({success: true}));
//   });
// });

router.post("/delete", (req, res) => {
  console.log("delete");
  res.json({success: false});
  // check if user has permission
  // knex("comments")
  //   .where("id", req.body.id)
  //   .del()
  //   .then(() => res.json({success: true}));
});

module.exports = router;
