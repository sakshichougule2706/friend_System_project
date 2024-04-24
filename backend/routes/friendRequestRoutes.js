const express = require('express');
const router = express.Router();
const FriendRequest = require('../models/friendRequestModel');


router.get('/', async (req, res) => {
  try {
    const friendRequests = await FriendRequest.find();
    res.json(friendRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', async (req, res) => {
  const friendRequest = new FriendRequest({
    sender: req.body.sender,
    recipient: req.body.recipient,
  });

  try {
    const newFriendRequest = await friendRequest.save();
    res.status(201).json(newFriendRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/accept/:id', async (req, res) => {
  try {
    const friendRequest = await FriendRequest.findById(req.params.id);
    if (friendRequest) {
      friendRequest.status = 'accepted';
      await friendRequest.save();
      res.json({ message: 'Friend request accepted' });
    } else {
      res.status(404).json({ message: 'Friend request not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/decline/:id', async (req, res) => {
  try {
    const friendRequest = await FriendRequest.findById(req.params.id);
    if (friendRequest) {
      friendRequest.status = 'declined';
      await friendRequest.save();
      res.json({ message: 'Friend request declined' });
    } else {
      res.status(404).json({ message: 'Friend request not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
