const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: String,
  favoriteQuotes: String,
  interests: String,
  hobbies: String,
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;