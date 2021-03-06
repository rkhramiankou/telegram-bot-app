/* eslint-disable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies */
const path = require('path')
const slsw = require('serverless-webpack')
const CopyPlugin = require('copy-webpack-plugin')
// const ESBuildPlugin = require('esbuild-webpack-plugin').default

module.exports = {
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.IS_LOCAL ? 'development' : 'production',
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  // optimization: {
  //   minimizer: [new ESBuildPlugin()],
  // },
  externals: [{ 'aws-sdk': 'commonjs aws-sdk', sharp: 'commonjs sharp' }],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /sandwich-stream\.m?js/,
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'fonts', to: 'fonts' }],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
}
