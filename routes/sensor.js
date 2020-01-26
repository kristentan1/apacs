const express = require("express");
const router = express.Router();
const sensorData = require("../data");

router.get("/", (req, res) => {
  const runSensor = sensorData.runSensor(req, res);
  console.log(runSensor);
  res.render("layouts/motionTest", runSensor);
});

module.exports = router;