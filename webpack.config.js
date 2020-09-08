const WebpackPwaManifest = require('webpack-pwa-manifest');
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
  },
  plugins: [
    new WebpackPwaManifest({
      fingerprints: false,
      name: "BLURB.BE",
      short_name: "BLURB.BE",
      description: "A chat app with rooms seperated by subject matter.",
      background_color: "#007bff",
      theme_color: "#2e2e2e",
      "theme-color": "#2e2e2e",
      start_url: '/',
      icons: [
        {
          src: path.resolve('public/build/images/blurb_be-logo192x192.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('images'),
        },
      ],
    })
  ]
}
module.exports = config;