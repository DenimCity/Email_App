const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router({mergeParams: true})
require('dotenv').config()


router.post('/:email', (req, res) => {
  const { email } = req.params 
  nodemailer.createTestAccount((err, account) => {
      let transporter = nodemailer.createTransport({
        service:"Gmail", 
          auth: {
              user: process.env.GMAIL_ADDRESS,            
              pass: process.env.GMAIL_PASSWORD 
          }
      });

      let mailOptions = {
          from: '"Jean Altidor " <altidorj1.com>', 
          to: email, 
          subject: 'FROM JEAN THE MACHINE EMAIL APP', 
          text: 'Hi How are you?', 
          html: `<b>Jean Was Here!!!</b>
          `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        const { emailDetails } = mailOptions
          if (error) {
              return console.log(error);
          } else {
            res.json({
              message: `Email Successfuly Sent`,
              success:`Message was sent to ${mailOptions.to}`
            })
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
  });
})

module.exports = router