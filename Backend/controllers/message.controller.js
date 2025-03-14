import User from "../modals/user.modal.js";
import Message from "../modals/message.modal.js";

import memoryCache, { generateCacheKey } from "../utils/nodeCache.js";

export const getUsers = async (req, res) => {
  const { id } = req.params;

  try {
    // ! Check cache for users
    const cacheKey = generateCacheKey("users", id);
    if (memoryCache.has(cacheKey)) {
      const userCache = memoryCache.get(cacheKey);
      return res.status(200).json({ sucess: true, users: userCache });
    }

    // ? Fetch users except cur User
    const users = await User.find({
      _id: { $ne: id },
    }).select("-password");

    // ! Set cache for users
    memoryCache.set(`users-${id}`, users);

    return res.status(200).json({ sucess: true, users });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMessages = async (req, res) => {
  const { from, to } = req.params;

  try {
    const fromToKey = generateCacheKey("messages", `${from}-${to}`);
    const toFromKey = generateCacheKey("messages", `${to}-${from}`);

    // ! Check cache for either one of the keys
    if (memoryCache.has(fromToKey)) {
      const cachedMessages = JSON.parse(memoryCache.get(fromToKey));
      return res.status(200).json({ success: true, messages: cachedMessages });
    }

    if (memoryCache.has(toFromKey)) {
      const cachedMessages = JSON.parse(memoryCache.get(toFromKey));
      return res.status(200).json({ success: true, messages: cachedMessages });
    }

    // ? Fetch messages
    const messages = await Message.find({
      $or: [
        { sender: from, receiver: to },
        { sender: to, receiver: from },
      ],
    });

    // ! Set caches
    memoryCache.set(fromToKey, JSON.stringify(messages));
    memoryCache.set(toFromKey, JSON.stringify(messages));

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendMessage = async (req, res) => {
  const { from, to } = req.params;

  try {
    const { text, image } = req.body;

    if (image) {
    }

    const message = new Message({
      sender: from,
      receiver: to,
      text,
      image,
    });

    // ! Save message
    await message.save();

    const fromToKey = generateCacheKey("messages", `${from}-${to}`);
    const toFromKey = generateCacheKey("messages", `${to}-${from}`);

    // ! Clear the cache for both keys
    memoryCache.del(fromToKey);
    memoryCache.del(toFromKey);

    return res.status(200).json({ success: true, message });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
