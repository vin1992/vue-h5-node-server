let webpack = require("webpack");
let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");
let VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = (env, args) => {
  env = (env && env.mode) || process.env.NODE_ENV;
  const config = Config(env);
  console.log(env, "111");

  return {
    entry: "./src/main.js",
    output: {
      filename: "[name].bundle.js",
      // chunkFilename: '[name].[chunkhash].bundle.js',
      path: path.join(__dirname, "dist"),
      publicPath: "/" // 存放静态资源文件
    },
    mode: config.mode,
    module: {
      rules: [
        {
          test: /\.vue?$/,
          exclude: /bower_components/,
          loader: "vue-loader",
          query: {
            cacheDirectory: false
          }
        },
        {
          test: /\.less$/,
          use: ["vue-style-loader", "css-loader", "less-loader"]
        },
        {
          test: /\.(png|jpg|gif|JPG|GIF|PNG|BMP|bmp|JPEG|jpeg)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192
              }
            }
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        name: "vendor",
        chunks: "initial",
        minChunks: 3
      }
    },
    devtool: config.devtool,
    devServer: {
      host: "127.0.0.1",
      port: config.port,
      hot: true,
      inline: true,
      disableHostCheck: true, //
      historyApiFallback: true,
      setup: function(app) {
        app.all("/*/ajax/**", function(req, res) {
          // req.query
          var path = "./mock" + req.path.replace(/\/ajax/, "");
          delete require.cache[require.resolve(path)];
          // res.json(require(path)());
          setTimeout(function() {
            res.json(require(path));
          }, 500);
        });
      }
    },
    resolve: {
      extensions: [".js", "json", ".vue"]
    },
    plugins: config.plugins
  };
};

function Config(env) {
  return {
    port: 1234,
    get plugins() {
      if (env == "production") {
        return [
          // 生产环境
          new CleanWebpackPlugin(["dist"]),
          new HtmlWebpackPlugin({
            title: "vue-h5-node-server",
            favicon: "favicon.ico",
            template: "./template.html",
            chunk: [],
            inject: true
          }),
          new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
          }),
          new VueLoaderPlugin()
        ];
      }
      return [
        // 开发环境
        new CleanWebpackPlugin(["dist"]),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
          title: "vue-h5-node-server",
          favicon: "favicon.ico",
          template: "./template.html",
          chunk: [],
          inject: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify(env || "development")
        }),

        new webpack.NamedModulesPlugin(),
        new webpack.HashedModuleIdsPlugin()
      ];
    },
    get devtool() {
      if (env == "production") {
        return "source-map";
      }
      return false;
    },
    get mode() {
      if (env == "production") {
        return "production";
      }
      return "development";
    }
  };
}
