var express = require("express"),
  router = express.Router(),
  knex = require('../db/knex'),
  jwt = require('jsonwebtoken');
  require('dotenv').load()
