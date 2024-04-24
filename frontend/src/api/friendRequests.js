import axios from "axios";

export const sendFriendRequest = async (username) => {
  try {
    await axios.post("/friendRequests/send", { username });
  } catch (error) {
    throw new Error("Error sending friend request");
  }
};

export const getFriendRequests = async () => {
  try {
    const response = await axios.get("/friendRequests");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching friend requests");
  }
};
