const HtmlWebpackPlugin = require("html-webpack-plugin");
const sass = require("node-sass");
const sassUtils = require("node-sass-utils")(sass);
const sassVars = require(__dirname + "/src/theme.js");

module.exports = {
  mode: "development",
  output: {
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              functions: {
                "get($keys)": function(keys) {
                  keys = keys.getValue().split(".");
                  let result = sassVars;
                  let i;
                  for (i = 0; i < keys.length; i++) {
                    result = result[keys[i]];
                  }
                  result = sassUtils.castToSass(result);
                  return result;
                }
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
