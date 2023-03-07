const path = require("path")
const { merge } = require("webpack-merge")
const ESLintPlugin = require("eslint-webpack-plugin")
const common = require("./webpack.common")

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: 5050,
    compress: true,
    open: true,
    historyApiFallback: true,
  },
  output: {
    publicPath: "/",
  },
  plugins: [
    new ESLintPlugin({
      exclude: [path.resolve(__dirname, "node_modules")],
      extensions: ["js", "jsx"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: { importLoaders: 2 },
          },
        ],
      },
    ],
  },
})
