const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router({mergeParams: true})




const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user:process.env.GMAIL_ADDRESS,
    passord:process.env.GMAIL_PASSWORD
  }
})
router.post('/:email', (req, res, next) => {
  const mailDetails = {
    from: process.env.GMAI_ADDRESS,
    to:req.params.email,
    subject: 'FROM JEAN THE MACHINE EMAIL APP',
    html:`<h1>Hi This is Jean</h1>
          <h2>I hope your're have a great day</h2>
          <h5>Checkout my twitter page www.twitter.com/JW_Altidor</h5>
    `
  }

  transporter.sendMail(mailDetails, (err, info) => {
    if(err){
      console.log(`The error is => ${err}`)
      res.json(err)
    } else {
      console.log(`the info => ${info}`)
      res.json(info)
    }
  })


  res.json({
    success:true,
    message:'Email Sent!'
  })
    })


module.exports = router