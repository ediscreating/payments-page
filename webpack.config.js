const config = {
  entry: ['core-js/fn/object/assign', 'core-js/es6/array', './src/js/'],
  output: {
    filename: 'dist/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};

module.exports = config;
