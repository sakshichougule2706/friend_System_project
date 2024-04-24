const User = require('../models/User');
const FriendRequest = require('../models/friendRequestModel');


async function getFriendRequests(req, res) {
  try {
      const friendRequests = await FriendRequest.find();
      
      if (!friendRequests) {
          console.error('No friend requests found.');
          return res.status(404).json({ error: 'No friend requests found' });
      }
      return res.json(friendRequests);
  } catch (error) {
      console.error('Error fetching friend requests:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function acceptFriendRequest(req, res) {
  try {
    const { requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId).populate('sender');
    if (!friendRequest) {
      return res.status(404).json({ error: 'Friend request not found' });
    }
    if (friendRequest.status !== 'pending') {
      return res.status(400).json({ error: 'Friend request has already been processed' });
    }
    if (!req.user || !req.user.username) {
      return res.status(400).json({ error: 'User is not authenticated or username is missing' });
    }
    friendRequest.sender.friendRequests = friendRequest.sender.friendRequests.filter(request => request._id.toString() !== req.user._id.toString());
    await friendRequest.sender.save();
    req.user.friends.push(friendRequest.sender._id);
    await req.user.save();
    friendRequest.status = 'accepted';
    await friendRequest.save();
    res.status(200).json({ message: 'Friend request accepted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

async function declineFriendRequest(req, res) { 
  try {
    const { requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ error: 'Friend request not found' });
    }
    if (friendRequest.status !== 'pending') {
      return res.status(400).json({ error: 'Friend request has already been processed' });
    }
    if (!req.user || !req.user.username) {
      return res.status(400).json({ error: 'User is not authenticated or username is missing' });
    }
    const sender = await User.findById(friendRequest.sender);
    sender.friendRequests = sender.friendRequests.filter(request => request._id.toString() !== req.user._id.toString());
    await sender.save();
    await friendRequest.delete();
    res.status(200).json({ message: 'Friend request declined successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getFriendRequests,
  acceptFriendRequest,
  declineFriendRequest
};
