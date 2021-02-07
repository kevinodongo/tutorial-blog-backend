const express = require("express")
const router = express.Router()
const blog = require("../controller/blog.controller");
const { auth_jwt_token } = require("../authentication");

// /api/blog: GET, POST, DELETE
// /api/blog/:id: GET, PUT, DELETE
// /api/blog/published: GET

// Create a new blog
router.post("/", [auth_jwt_token.verify_passort], blog.create)
  
// Retrieve all blog
router.get("/", blog.findAll);

// Retrieve all published blog
router.get("/published", blog.findAllPublished);

// Retrieve a single blog with id
router.get("/:id", [auth_jwt_token.verify_passort], blog.findOne);

// Update a Tutorial with id
router.put("/:id", [auth_jwt_token.verify_passort], blog.update);

// Delete a Tutorial with id
router.delete("/:id", [auth_jwt_token.verify_passort, auth_jwt_token.isAdmin], blog.delete);

// Create a new Tutorial
router.delete("/", [auth_jwt_token.verify_passort, auth_jwt_token.isAdmin], blog.deleteAll);

module.exports = router