const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `\x1b[35m%s\x1b[0m`,
      `All the way live with 💾 MongoDB --Database: ${connect.connection.name} | 📍 Host: ${connect.connection.host}`,
    );
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", "MongodDB === 🔥🗑️🗑️🔥", error);
    process.exit(1);
  }
};
