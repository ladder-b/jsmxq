const path = require('path');

module.exports = {
  entry: './src/index.ts',
//   mode: "production",
  mode: "development",
  devtool: 'inline-source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'jsmx.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'jsmx',
    libraryTarget: 'umd',
  },
  externals: {
    lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_',
        },
    }
};