const path = require('path');
const { AsyncDependenciesBlock } = require('webpack');

module.exports = {
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, 'dist/assets'),
      filename: 'bundle.js',
   },
   devServer: {
      // contentBase is place of the content that we want to serve up to browser
      static: {
         directory: path.resolve(__dirname, 'dist'),
      },
      // publicPath is where the actual assets being served up from
      publicPath: '/assets/',
      // open is to automatically open the browser when run webpack script
      open: true,
   },
};
