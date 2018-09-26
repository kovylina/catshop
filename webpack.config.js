const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const config = {
  entry: {
    select: "./src/assets/scripts/select.js"
  },
  output: {
    filename: "[name].bundle.js"
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
  ],
  mode: "none"
};

module.exports = config;
