const express = require('express')
const router = express.Router({mergeParams: true})

router.post('/message', (req, res, next) => {
  console.log('done')
    })


module.exports = router