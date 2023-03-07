const path = require("path")
const { merge } = require("webpack-merge")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const common = require("./webpack.common")

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "[contenthash].[name].js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 2, sourceMap: true },
          },
        ],
      },
    ],
  },
  performance: false,
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
    },
  },
})
