const { Router } = require("express");
const config = require("config");
const shortid = require("shortid");
const linkModel = require("../models/linkModel");
const auth = require("../middlewares/auth.middleware");
const router = Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;

    const code = shortid.generate();
    const existing = await linkModel.findOne({ from });

    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + "/t/" + code;
    const link = new linkModel({
      code,
      to,
      from,
      owner: req.user.userId,
    });

    await link.save();

    res.status(201).json({ link });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Try again later" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await linkModel.find({ owner: req.user.userId });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Try again later" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const link = await linkModel.findById(req.params.id);
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Try again later" });
  }
});

module.exports = router;
