const router = require("express").Router();
const Code = require("../models/code");
const verify = require("../middlewares/verifyToken");
const objectid = require("../validation/objectid");
const { editorValidation } = require("../validation/validation");
//save a entry
router.post("/", verify, async (req, res) => {
  //console.log(req.body);
  const { error } = editorValidation(req.body);
  if (error) {
    const message = error.details[0].message;
    return res.status(400).send(JSON.stringify({ message }));
  }
  const { html, css, js, title, type } = req.body;
  const code = new Code({
    html: html,
    js: js,
    css: css,
    title: title,
    userid: req.user,
    type: type,
  });
  try {
    const saveCode = await code.save();
    res.status(201).send({ code: code._id });
  } catch (err) {
    res.status(400).send({ message: "Error in Post" });
  }
});

//get all entry
router.get("/", verify, async (req, res) => {
  await Code.find({ userid: req.user }, ["title", "_id"], function (err, doc) {
    // console.log(doc);
    if (err) return res.status(400).send({ message: "Error in Get All" });
    else res.status(201).send(doc);
  });
});

//get specific id
router.get("/:id", verify, async (req, res) => {
  if (objectid(req.params.id) === false)
    return res.status(404).send({ message: "Not Found" });

  await Code.findOne({ _id: req.params.id }, function (err, doc) {
    //console.log(err);
    if (err) return res.status(400).send({ message: "Error in get" });
    else if (doc === null)
      return res.status(404).send({ message: "Not Found" });
    else if (doc.userid == req.user._id || doc.type === 1 || doc.type === 2)
      res.status(200).send(doc);
    else {
      res.status(403).send({ message: "No Access" });
    }
  });
});

//update
router.put("/:id", verify, async (req, res) => {
  await Code.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, useFindAndModify: false },
    function (err, doc) {
      if (err) return res.status(400).send({ message: "Error in put" });
      else if (doc === null)
        return res.status(404).send({ message: "Not Found" });
      else if (doc.userid == req.user._id || doc.type === 1)
        res.status(200).send({ message: "Successful", data: { doc } });
      else res.status(403).send({ message: "No Access" });
    }
  );
});

//delete
router.delete("/:id", verify, async (req, res) => {
  await Code.findOneAndDelete(
    { _id: req.params.id, userid: req.user },
    function (err, doc) {
      //  console.log(doc);
      if (err) return res.status(400).send({ message: "Error in Delete" });
      else if (doc === null)
        return res.status(403).send({ message: "Cannot Delete" });
      else return res.status(200).send({ message: "Deleted" });
    }
  );
});

module.exports = router;
