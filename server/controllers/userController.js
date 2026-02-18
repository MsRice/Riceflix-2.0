const User = require("../models/User.js");

const jwt = require("jsonwebtoken");

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

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(201).json({
      token,
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

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
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
    return res.status(500).json({ message: "Token is invalid or expired" });
  }
}

async function createProfile(req, res) {
  try {
    const userId = req.user.id;
    const { name, avatar_img } = req.body;

    if (!name) {
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
    });
    await user.save();

    const createdProfile = user.profiles[user.profiles.length - 1];

    const payload = {
      id: user._id,
      profileId: createdProfile.profileId,
      role: createdProfile.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(201).json({
      token,
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

    if (!profileId) {
      return res.status(400).json({ message: "No profile ID provided" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = user.profiles.id(profileId);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

module.exports = {
  registration,
  login,
  getUser,
  createProfile,
  updateList,
  getProfile,
  getList,
  deleteListItem,
};
