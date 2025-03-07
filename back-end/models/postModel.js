const mongoose = require("mongoose");
const Community = require("./communityModel");

const postSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    communityId: { type: mongoose.Schema.ObjectId, ref: "Community" },
    title: String,
    content: String,
    media: [{ type: String }],
    commentCount: { type: Number, default: 0 },
    votes: { type: Map, of: String, default: {} }, // ✅ FIXED: Now stores "like" or "dislike"
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
    isEdited: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ✅ Fix: Prevent filtering issues
postSchema.pre(/^find/, function (next) {
  if (!this.getFilter().isActive) {
    this.find({ isActive: { $ne: false } });
  }
  next();
});

// ✅ Fix: Prevent errors when updating post count
postSchema.post("save", async function (doc, next) {
  try {
    if (doc.communityId) {
      await Community.findByIdAndUpdate(doc.communityId, { $inc: { postCount: 1 } });
    }
    next();
  } catch (err) {
    console.error("Error updating community post count:", err);
    next(err);
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
