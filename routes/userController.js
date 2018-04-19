const express = require('express')
const router = express.Router()
const app = express();
const User = require('../db/models/User')
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.get('/', (req, resp) => {
  const users = User.find({})
  if (users.length < 1) {
    console.log(`No users`);
    res.json({attempt: `Failed `, message: `No Users Found`})
  } else {
    console.log(`found Users`);
    res
      .json({attempt: `Success`, Message: `Users Found`, users})
      .catch((err) => {
        console.log(`Error` + e)
      })
  }
})




module.exports = router