const path = require("path")
const Dotenv = require("dotenv-webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin")

module.exports = {
  entry: "./src/index.js",
  plugins: [
    new Dotenv({
      path: "./.env",
      safe: true,
    }),
    new HTMLWebpackPlugin({
      template: "public/index.html",
    }),
  ],
  resolve: {
    plugins: [new DirectoryNamedWebpackPlugin(true)],
  },
  module: {
    rules: [
      {
        test: /\.(mjs|js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[contenthash].[ext]",
            outputPath: "assets/images",
          },
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[hash].[name].[ext]",
            outputPath: "assets/fonts",
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@Apollon": path.resolve(__dirname, `src/apollo`),
      "@Components": path.resolve(__dirname, `src/components`),
      "@Constants": path.resolve(__dirname, `src/constants`),
      "@Graphql": path.resolve(__dirname, `src/graphql`),
      "@Helpers": path.resolve(__dirname, `src/helpers`),
      "@Hooks": path.resolve(__dirname, `src/hooks`),
      "@Redux": path.resolve(__dirname, `src/redux`),
      "@Styles": path.resolve(__dirname, `src/styles`),
    },
  },
}
