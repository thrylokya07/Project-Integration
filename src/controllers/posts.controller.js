let posts = [
  { id: 1, title: "First Post", content: "Hello World" }
];

// Standard Response Helper
const successResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const getAllPosts = (req, res) => {
  return successResponse(res, 200, "Posts fetched successfully", posts);
};

const getPostById = (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found"
    });
  }

  return successResponse(res, 200, "Post fetched successfully", post);
};

const createPost = (req, res) => {
  const { title, content } = req.body;

  const newPost = {
    id: posts.length + 1,
    title,
    content
  };

  posts.push(newPost);

  return successResponse(res, 201, "Post created successfully", newPost);
};

const updatePost = (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found"
    });
  }

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;

  return successResponse(res, 200, "Post updated successfully", post);
};

const deletePost = (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Post not found"
    });
  }

  posts.splice(index, 1);

  return successResponse(res, 200, "Post deleted successfully", null);
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};