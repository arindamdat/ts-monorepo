
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const PATHS = {
  src: path.join(__dirname, "src"),
  images: path.join(__dirname, "src", "assets", "images"),
};
console.log(process.env);
const config = {
  entry: [
    // activate HMR for React
    "react-hot-loader/patch",
    "whatwg-fetch",
    "./src/index.tsx",
  ],
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "scripts/[id]-[hash].js",
    chunkFilename: "scripts/[id]-[hash].js",
  },

  // Enable sourcemaps for debugging webpack"s output.
  devtool: "source-map",

  resolve: {
    modules: [
      path.resolve("./src"),
      path.resolve(__dirname, "..", "..", "node_modules"),
      path.resolve("./node_modules"),
    ],
    alias: {
      "~": path.resolve(__dirname, "..", "shared"),
    },
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".json"],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: true,
    }),
    new CopyWebpackPlugin([
      {
        from: PATHS.images,
        to: "assets/images",
      },
    ]),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  node: {
    fs: "empty",
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              plugins: ["react-hot-loader/babel"],
            },
          },
          "ts-loader",
        ],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: "html-loader",
      },
      {
        test: /\.(jpg|png|svg)$/,
        exclude: /node_modules/,
        loader: "file?publicPath=../&name=./images/img-[hash].[ext]",
      },
    ],
  },
};
if (process.env.NODE_ENV === "development") {
  console.log("DIRECTORY:", __dirname);
  config.devServer = {
    contentBase: [
      path.join(__dirname,"src")
    ],
    watchContentBase: true,
    historyApiFallback: true,
    hot: true,
    stats: "normal",
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8080,
    watchOptions: {
      poll: 1000,
    },
  };

} else {
  // Do Prod Build things
}

module.exports = config;
