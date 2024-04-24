const Profile = require('../models/Profile');

exports.updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { favoriteQuotes, interests, hobbies } = req.body;

  try {
    let profile = await Profile.findOne({ userId });

    if (!profile) {
      profile = new Profile({ userId, favoriteQuotes, interests, hobbies });
    } else {
      profile.favoriteQuotes = favoriteQuotes;
      profile.interests = interests;
      profile.hobbies = hobbies;
    }

    await profile.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
