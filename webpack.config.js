const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.s[ca]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
