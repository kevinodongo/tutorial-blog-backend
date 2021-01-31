const express = require("express")
const router = express.Router()
const blog = require("../controller/blog.controller");

// /api/blog: GET, POST, DELETE
// /api/blog/:id: GET, PUT, DELETE
// /api/blog/published: GET

// Create a new blog
router.post("/", blog.create);
  
// Retrieve all blog
router.get("/", blog.findAll);

// Retrieve all published blog
router.get("/published", blog.findAllPublished);

// Retrieve a single blog with id
router.get("/:id", blog.findOne);

// Update a Tutorial with id
router.put("/:id", blog.update);

// Delete a Tutorial with id
router.delete("/:id", blog.delete);

// Create a new Tutorial
router.delete("/", blog.deleteAll);

module.exports = router