const User = require("../models/User.js");

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

async function registration(req, res) {
  console.log("ntt");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Plese give an email and password",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "This emailed has already been registered",
      });
    }

    const newUser = await User.create({
      email,
      password,
    });

    const payload = {
      id: newUser._id,
      role: "user",
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(201).json({
      accessToken,
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Missing email or password",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
      });
    }

    const isValidPass = await user.comparePassword(password);
    if (!isValidPass) {
      return res.status(400).json({
        message: "Incorrect email or password",
      });
    }
    const payload = {
      id: user._id,
      username: user.username,
      role: "user", // user only login , adim login stretch goal
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.json({
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

async function getUser(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
}

async function createProfile(req, res) {
  try {
    const userId = req.user.id;
    const { name, avatar_img, isKid } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "Plese give a name",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.profiles.length >= 5) {
      return res.status(400).json({
        message: "Maximum of 5 profiles allowed",
      });
    }
    const role = user.profiles.length === 0 ? "owner" : "guest";

    user.profiles.push({
      name,
      avatar_img,
      role,
      isKid,
    });
    await user.save();

    const createdProfile = user.profiles[user.profiles.length - 1];

    return res.status(201).json({
      message: "Profile created successfully",
      profile: createdProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function updateList(req, res) {
  try {
    const userId = req.user.id;
    const { profileId, listName, contentId } = req.body;

    const validLists = ["watchlist", "history", "favorite"];
    if (!validLists.includes(listName)) {
      return res.status(400).json({ message: "Invalid list name" });
    }

    if (!contentId || !profileId) {
      return res
        .status(400)
        .json({ message: "Missing profileId or contentId" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "profiles._id": profileId },
      {
        $addToSet: { [`profiles.$.${listName}`]: contentId },
      },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User or Profile not found" });
    }

    res.status(200).json({
      message: `Successfully added to ${listName}`,
      profiles: updatedUser.profiles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function getProfile(req, res) {
  try {
    const userId = req.user.id;
    const profileId = req.user.profileId || req.query.id;

    console.log("REQ USER:", req.user);
    console.log("USER ID:", req.user?.id);
    console.log("PROFILE ID:", req.query.id);

    if (!profileId) {
      return res.status(400).json({ message: "No profile ID provided" });
    }

    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      return res.status(400).json({ message: "Invalid profile ID" });
    }
    const user = await User.findOne(
      { _id: userId, "profiles._id": new mongoose.Types.ObjectId(profileId) },
      { "profiles.$": 1 },
    );

    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(user.profiles[0]);
  } catch (error) {
    console.error("🔥 GET PROFILE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}

async function deleteProfile(req, res) {
  try {
    const userId = req.user.id;
    const profileId = req.params.id || req.body.profileId;

    if (!profileId) {
      return res.status(400).json({
        message: "No profile ID provided",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const profile = user.profiles.id(profileId);

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    // 🔥 Prevent deleting owner profile
    if (profile.role === "owner") {
      return res.status(403).json({
        message: "Owner profile cannot be deleted",
      });
    }

    profile.deleteOne(); // remove subdocument
    await user.save();

    return res.status(200).json({
      message: "Profile deleted successfully",
      profiles: user.profiles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server error",
    });
  }
}

async function getList(req, res) {
  try {
    const userId = req.user.id;
    const { profileId } = req.user;
    const { listType } = req.params;

    const validLists = ["watchlist", "history", "favorite"];
    if (!validLists.includes(listType)) {
      return res.status(400).json({ message: "Invalid list type" });
    }

    const user = await User.findById(userId).populate({
      path: `profiles.${listType}`,
      model: "Content",
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = user.profiles.id(profileId);
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.status(200).json({
      listName: listType,
      data: profile[listType],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteListItem(req, res) {
  try {
    const userId = req.user.id;
    const { profileId } = req.user;
    const { listType, contentId } = req.params;

    const validLists = ["watchlist", "history", "favorite"];
    if (!validLists.includes(listType)) {
      return res.status(400).json({ message: "Invalid list type" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "profiles._id": profileId },
      {
        $pull: { [`profiles.$.${listType}`]: contentId },
      },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User or Profile not found" });
    }

    res.status(200).json({
      message: `Item removed from ${listType}`,

      updatedList: updatedUser.profiles.id(profileId)[listType],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateProfile(req, res) {
  try {
    const userId = req.user.id;
    const { profileId, name, isKid } = req.body;

    if (!profileId) {
      return res.status(400).json({
        message: "Profile ID is required",
      });
    }

    const updateFields = {};

    if (name !== undefined) {
      if (name.trim() === "") {
        return res.status(400).json({
          message: "Profile name cannot be empty",
        });
      }
      updateFields["profiles.$.name"] = name.trim();
    }

    if (isKid !== undefined) {
      updateFields["profiles.$.isKid"] = isKid;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided for update",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "profiles._id": profileId },
      { $set: updateFields },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User or profile not found",
      });
    }

    const updatedProfile = updatedUser.profiles.id(profileId);

    return res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

module.exports = {
  registration,
  login,
  getUser,
  createProfile,
  updateList,
  getProfile,
  deleteProfile,
  getList,
  deleteListItem,
  updateProfile,
};
