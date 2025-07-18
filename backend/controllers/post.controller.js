import Post from "../models/Post.js";
import User from "../models/User.js";


export const createPost = async (req, res) => {
   const userId = req.userId;
  const { caption } = req.body;
  const imageUrl = req.body.imageUrl;

  if (!imageUrl)
    return res.status(400).json({ message: "Image upload failed" });

  try {
    const post = await Post.create({ creator: userId, caption, imageUrl });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to create post" });
  }
};


// export const getAllPosts = async (req, res) => {
//   try {
//     const posts = await Post.find()
//       .populate("creator", "name email")
//       .populate("comments.user", "name")
<<<<<<< HEAD
//       .sort({ createdAt: -1 });

//     // Optional safety: initialize likes/comments if missing (paranoia check)
//     const sanitizedPosts = posts.map(post => ({
//       ...post.toObject(),
//       likes: post.likes || [],
//       comments: post.comments || [],
//     }));

//     res.status(200).json(sanitizedPosts);
=======
//       .sort({ createdAt: -1 
//     res.status(200).json(posts);
>>>>>>> 6704935b322b79b07a9925a789d454d0ced9f682
//   } catch (err) {
//     console.error("Fetch error:", err);
//     res.status(500).json({ message: "Failed to fetch posts" });
//   }
// };
<<<<<<< HEAD
=======
// export const getAllPosts = async (req, res) => {
//   try {
//     const posts = await Post.find()
//       .populate("creator", "name email")
//       .populate("comments.user", "name")
//       .sort({ createdAt: -1 });

//     // Optional safety: initialize likes/comments if missing (paranoia check)
//     const sanitizedPosts = posts.map(post => ({
//       ...post.toObject(),
//       likes: post.likes || [],
//       comments: post.comments || [],
//     }));

//     res.status(200).json(sanitizedPosts);
//   } catch (err) {
//     console.error("Fetch error:", err);
//     res.status(500).json({ message: "Failed to fetch posts" });
//   }
// };
>>>>>>> 6704935b322b79b07a9925a789d454d0ced9f682

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("creator", "name avatar")
      .populate("comments.user", "name")
      .sort({ createdAt: -1 });

    const formattedPosts = posts.map(post => ({
      _id: post._id,
      caption: post.caption,
      imageUrl: post.imageUrl,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      creator: post.creator,
      likesCount: post.likes.length,
      commentsCount: post.comments.length,
      likedBy: post.likes, // optional, if you want to check if user liked it
      comments: post.comments, // optional for detailed list
    }));

    res.status(200).json(formattedPosts);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

export const likePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;

  try {
    const post = await Post.findById(postId);

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.status(200).json({ likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: "Error updating like" });
  }
};

export const commentOnPost = async (req, res) => {
  const postId = req.params.id;
  const { text } = req.body;
  const userId = req.userId;

  try {
    const post = await Post.findById(postId);
    post.comments.push({ user: userId, text });
    await post.save();

    const populated = await post.populate("comments.user", "name");

    res.status(200).json(populated.comments);
  } catch (err) {
    res.status(500).json({ message: "Error posting comment" });
  }
};


export const getUserPosts = async (req, res) => {
  const userId = req.params.userId;

  try {
    const posts = await Post.find({ creator: userId }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user posts" });
  }
};
