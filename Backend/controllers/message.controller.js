import Message from "../modals/message.modal.js";

import memoryCache, { generateCacheKey } from "../utils/nodeCache.js";
import { uploadCloudinary } from "../utils/cloudinary.js";

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
    return res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  const { from, to } = req.params;

  try {
    const { text } = req.body;
    const image = req.file;

    let imageURL = null;
    if (image) {
      const b64 = Buffer.from(req.file?.buffer).toString("base64");
      const url = `data:image/${req.file?.mimetype};base64,${b64}`;

      // ! Upload to Cloudinary
      const uploadResponse = await uploadCloudinary(url);
      imageURL = uploadResponse?.secure_url;
    }

    const message = new Message({
      sender: from,
      receiver: to,
      text,
      image: imageURL,
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
    return res.status(500).json({ message: error.message });
  }
};
