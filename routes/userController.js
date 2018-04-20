const express = require('express')
const router = express.Router()
const User = require('../db/models/User')
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', async(req, res) => {
  try {
    const users = await User.find({})
    if (users.length < 1) {
      res.json({err: "No Users in Database"})
    } else {
      res.json(users)
    }
  } catch (err) {
    console.log(err)
  }
})

router.get('/:email', async(req, res) => {
  const email = req.params.email
  await User
    .findOne({email})
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      console.log(err);
      res.json({err: 'could not find user by email'});
    })

})

router.post('/', async(req, res) => {
  try {
    const email = await User.find({email: req.body.email})
    if (email.length < 1) {
      bcrypt.hash(req.body.password, saltRounds, async(err, hash) => {
        const user = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req
            .body
            .email
            .toLowerCase(),
          password: hash
        }

        const newUser = await User.create(user)
        newUser.save()
        res.json({newUser})
      })
    } else {
      res.json({err: 'That e-mail addresss is already in use'})
    }
  } catch (err) {
    console.log(err)
  }
})

router.patch('/:email', async(req, res) => {
  const email = req.params.email
  const newInfo = req.body
  try {
    const user = await User.findOneAndUpdate(email, newInfo)
    res.json(user)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.delete('/:email', async(req, res) => {
  const email = req.params

  await User
    .findOneAndRemove(email)
    .then(() => {
      res.json({message: "user deleted via email"})
    })
})

router.post('/login', async(req, response) => {
  const {password, email, user} = req.body
  try {
    const user = await User.find({email})
    if (!user.length) {
      response.json({error: "That e-mail does not belong to a user"})
    } else if (bcrypt.compareSync(password, user[0].password)) {
      response.json({email, message: "Logged In"})
    } else {
      response.json({error: "The password is incorrect. Please try again."})
    }
  } catch (err) {
    console.log(err)
    res.json({message: "Error Loggin in "})
  }
})

module.exports = router
