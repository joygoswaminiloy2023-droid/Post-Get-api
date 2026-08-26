
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let posts = [];
let nextId = 1;


function validatePost({ title, content, author }) {
  const errors = [];

  if (!title || typeof title !== "string" || title.trim().length < 3) {
    errors.push("title is required and must be at least 3 characters long");
  }

  if (!content || typeof content !== "string" || content.trim().length < 10) {
    errors.push("content is required and must be at least 10 characters long");
  }

  if (!author || typeof author !== "string" || author.trim().length === 0) {
    errors.push("author is required");
  }

  return errors;
}

app.post("/posts", (req, res) => {
  const { title, content, author } = req.body || {};

  const errors = validatePost({ title, content, author });

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors,
    });
  }

  const newPost = {
    id: nextId++,
    title: title.trim(),
    content: content.trim(),
    author: author.trim(),
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);

  return res.status(201).json({
    message: "Blog post created successfully",
    post: newPost,
  });
});


app.get("/posts", (req, res) => {
  return res.status(200).json({
    count: posts.length,
    posts,
  });
});


app.get("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Post ID must be a valid integer" });
  }

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ error: `Blog post with ID ${id} not found` });
  }

  return res.status(200).json(post);
});
