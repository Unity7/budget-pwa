const webpack = require("webpack");
const path = require("path");
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
  entry: {
    app: "./public/js/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/public",
  },
  module: {
    rules: [
      {
        test: /\.jpg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name(file) {
                return "[path][name].[ext]";
              },
              publicPath: function (url) {
                return url.replace("../", "/assets/");
              },
            },
          },
          {
            loader: "image-webpack-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new WebpackPwaManifest({
      name: "Budget Tracker",
      short_name: "Budget",
      description: "An app that allows you to view and track budget.",
      start_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      fingerprints: false,
      inject: false,
      icons: [
        {
          src: path.resolve("./public/icons/icon-512x512.png"),
          sizes: [72, 96, 128, 144, 192, 384, 512],
          destination: path.join("icons"),
        },
      ],
    }),
  ],
  mode: "development",
};
