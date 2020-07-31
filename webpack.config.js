const path = require('path');
config = {
  entry: './public/js/main.js',
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: 'app.bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
module.exports = config;