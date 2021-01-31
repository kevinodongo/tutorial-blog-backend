// INCASE YOU ARE USING MONGO DB REPLACE THE /MODEL/BLOG.MODEL.JS FILE WITH THIS CONTENT
//======================================================================

// module.exports = mongoose => {
//     const Blog = mongoose.model(
//       "blog",
//       mongoose.Schema(
//         {
//           author: String,
//           content: String,
//           published: Boolean
//         },
//         { timestamps: true }
//       )
//     );

//     // We can add category

//     // Incase you want to replace _.id with id 
//     // schema.method("toJSON", function() {
//     //   const { __v, _id, ...object } = this.toObject();
//     //   object.id = _id;
//     //   return object;
//     // });
  
//     // const Blog = mongoose.model("blog", schema);
  
//     return Blog;
//   };