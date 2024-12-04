const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  entry: { index: path.resolve(__dirname, 'demo', 'index.js') },
  output: {
    path: path.resolve(__dirname, 'public'),
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'demo', 'index.html'),
    }),
    new Dotenv({
      path: './demo/.env',
      systemvars: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: 'demo/assets', to: 'assets' },
        { from: 'demo/styles.css', to: '' },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@primitives': path.resolve(__dirname, 'src/primitives/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@icons': path.resolve(__dirname, 'src/icons/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
    },
  },
}
