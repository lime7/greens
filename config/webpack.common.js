const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const paths = require("./paths");

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + "/index.js"],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: "[name].bundle.js"
    // publicPath: '/',
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: "public",
          globOptions: {
            ignore: ["*.DS_Store"]
          },
          noErrorOnMissing: true
        }
      ]
    }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      // favicon: paths.src + '/images/favicon.png',
      template: paths.src + "/index.html", // template file
      filename: "index.html", // output file
      minify: false,
      templateParameters: {
        analytics: "Google Analytics ID",
        author: "Name Name",
        description: "Green is a test landing page for ordering organic products.",
        keywords: "landing, tailwindcss, webpack5",
        title: "Greens",
        url: "https://example.com"
      }
    }),

    new HtmlWebpackPlugin({
      // favicon: paths.src + '/images/favicon.png',
      template: paths.src + "/blog.html", // template file
      filename: "blog.html", // output file
      minify: false,
      templateParameters: {
        analytics: "Google Analytics ID",
        author: "Name Name",
        description: "Green is a test landing page for ordering organic products.",
        keywords: "landing, tailwindcss, webpack5",
        title: "Greens Blog",
        url: "https://example.com"
      }
    })
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      { test: /\.html$/, use: ["underscore-template-loader"] },

      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, use: ["babel-loader"] },

      // Images: Copy image files to build folder
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        type: "asset/resource",
        // loader: 'file-loader',
        generator: { filename: 'images/[hash].min[ext]'}
      },

      // Fonts and SVGs: Inline files
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/inline",
        generator: { filename: 'fonts/[name][ext]'}
      }
    ]
  },

  resolve: {
    modules: [paths.src, "node_modules"],
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "@": paths.src,
      assets: paths.public
    }
  }
};
