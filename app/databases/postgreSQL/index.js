// INCASE YOU ARE USING POSTGRESQL REPLACE THE INDEX.JS FILE WITH THIS CONTENT
//============================================================================

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// require('dotenv').config()

// const app = express();

// // parse application/json
// app.use(bodyParser.json())

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))


// var corsOptions = {
//   origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:8080']
// }
// // use cors options
// app.use(cors(corsOptions))

// // 
// const db = require("./app/models");
// // to force sync during development use below
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

 
// // routes
// const blog = require('./app/routes/blog')
// app.use('/api/blog', blog)
  
// // listening port
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
// });