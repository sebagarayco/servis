const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./src/index.js",
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        /* exclude: /node_modules/, */
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new Dotenv(),
  ]
};