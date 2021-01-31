module.exports = (sequelize, Sequelize) => {
  const Blog = sequelize.define("blog", {
    author: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Blog;
};

