import User from "../modals/user.modal.js";
import Message from "../modals/message.modal.js";

export const getUsers = async (req, res) => {
  const { id } = req.params;

  try {
    const users = await User.find({
      _id: { $ne: id },
    }).select("-password");

    return res.status(200).json({ sucess: true, users });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMessages = async (req, res) => {
  const { from, to } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: from, receiver: to },
        { sender: to, receiver: from },
      ],
    });

    return res.status(200).json({ sucess: true, messages });
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

    return res.status(200).json({ sucess: true, message });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
