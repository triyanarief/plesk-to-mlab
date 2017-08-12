const express = require('express');
const router  = express.Router();

router.get('/tasks', (req, res, next) => {
  res.send('coba render tasks');
});

module.exports  = router;
