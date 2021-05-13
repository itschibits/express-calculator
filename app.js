/** Simple demo Express app. */

const express = require("express");
const stats = require("./stats.js");
const utils = require("./utils");
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean/", function(req, res) {
  let intNums = utils.convertStrNums(req.query.nums)
  let mean = stats.findMean(intNums);
  return res.json({ operation: "mean", value: mean });

});


/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median/", function(req, res) {
  let intNums = utils.convertStrNums(req.query.nums)
  let median = stats.findMedian(intNums);
  return res.json({ operation: "median", value: median });
});



/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode/", function(req, res) {
  let intNums = utils.convertStrNums(req.query.nums)
  let mode = stats.findMode(intNums);
  return res.json({ operation: "mode", value: mode });
});


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;