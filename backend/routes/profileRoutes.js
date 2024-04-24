const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');


router.put('/:userId', profileController.updateProfile);
router.get('/userId', (req, res) => {
  
    const userId = getUserIdSomehow();
    res.json({ userId });
  });

module.exports = router;
