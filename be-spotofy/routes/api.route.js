const express = require("express");
const route = express.Router();

const apiController = require("../controllers/api.controller");

route.get("/get-data", apiController.getData);

module.exports = route;
