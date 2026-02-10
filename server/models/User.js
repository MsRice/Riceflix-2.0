const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const ProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  avatar_img: {
    type: String,
  },
  role: {
    type: String,
    enum: ["owner", "guest"],
    required: true,
    default: "guest",
  },
  watchlist: {
    type: [Schema.Types.ObjectId],
    ref: "Content",
    unique: true,
  },
  history: {
    type: [Schema.Types.ObjectId],
    ref: "Content",
    unique: true,
  },
  favorite: {
    type: [Schema.Types.ObjectId],
    ref: "Content",
    unique: true,
  },
});

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  profiles: {
    type: [ProfileSchema],
    validate: (val) => val.length <= 5,
  },
  subscription_tier: {
    type: String,
    enum: ["basic", "premium"],
    default: "basic",
  },
  next_billing_date: {
    type: Date,
    default: () => Date.now() + THIRTY_DAYS,
  },
  is_subscription_active: {
    type: Boolean,
    required: true,
    default: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  date_created: { type: Date, default: Date.now },
});

// The Pre-Save Hook: Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to verify password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
