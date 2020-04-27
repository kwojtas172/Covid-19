var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },
  devServer: {
    stats: "errors-only", 
    open: true,
    hot: true,
    host: "localhost",
    port: 8000,
    watchContentBase: true,
    contentBase: path.join(__dirname, "./"),
    publicPath: "/dist/",
    watchOptions: {
        poll: true
    }
  },
};