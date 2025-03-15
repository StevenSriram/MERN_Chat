import User from "../modals/user.modal.js";
import bcrypt from "bcrypt";

import generateJWT from "../utils/generateJWT.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ? Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ? Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = new User({ name, email, password: hashedPassword });

    // ! Save user
    await user.save();

    // ? Generate JWT
    const token = generateJWT(res, user);

    user = { ...user._doc, password: undefined };

    return res.status(201).json({
      success: true,
      token,
      user,
      message: "User Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ? Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // ? Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ? Generate JWT
    const token = generateJWT(res, user);

    user = { ...user._doc, password: undefined };

    return res
      .status(200)
      .json({ success: true, token, user, message: "Logged In Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    // ? Clear JWT cookie
    res.clearCookie("jwt");

    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    let user = req.user;

    user = { ...user, password: undefined };

    return res.status(200).json({
      success: true,
      user,
      message: "User is authenticated",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
