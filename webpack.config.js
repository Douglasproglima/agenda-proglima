const path = require('path'); // CommonJS

module.exports = {
  mode: 'production',
  entry: './frontend/main.js',
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js'),
    filename: 'bundle.js'
  },
  module: {
    rules: 
      [
        {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        }
      }, 
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
          ],
        },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  devtool: 'source-map'
};