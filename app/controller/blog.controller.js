
const db = require("../models");
const Blog = db.blog;

// Create and Save a new blog
exports.create = (req, res) => {
  
  // Validate request
  if (!req.body.content) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const blog = new Blog({
    author: req.body.author,
    content: req.body.content,
    published: req.body.published ? req.body.published : false
  });

  // Save blog in the database
  blog
    .save(blog)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the blog."
      });
    });
  
};

// Retrieve all blogs from the database.
exports.findAll = (req, res) => {
    const content = req.query.content;
    var condition = content ? { content: { $regex: new RegExp(content), $options: "i" } } : {};
  
    Blog.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving blogs."
        });
      });
  
};

// Find a single blog with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found blog with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving blog with id=" + id });
      });
  
};

// Update a blog by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Blog.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Blog with id=${id}. Maybe Blog was not found!`
            });
          } else res.send({ message: "Blog was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Blog with id=" + id
          });
        });
  
};

// Delete a blog with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Blog with id=${id}. Maybe Blog was not found!`
          });
        } else {
          res.send({
            message: "Blog was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  
};

// Delete all blogs from the database.
exports.deleteAll = (req, res) => {
    Blog.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Blogs were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all blogs."
      });
    });
};

// Find all published blogs
exports.findAllPublished = (req, res) => {
  Blog.find({ published: true })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving blogs."
    });
  });
};