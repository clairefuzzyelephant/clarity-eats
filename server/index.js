const express = require("express");
const gatsby = require("gatsby-plugin-nodejs");

const app = express();

gatsby.prepare({ app }, () => {
  // Here you can define your routes
});

const port = process.env.PORT || 1337;

app.listen(port, () => console.log(`listening on port ${port}`));