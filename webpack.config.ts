
import path from 'path';
import fs from 'fs';
//import NewNodemonPlugin from './common/newNodemonPlugin';
import NodemonPlugin from 'nodemon-webpack-plugin';
import webpack from 'webpack';


const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const config: webpack.Configuration = {
  mode: 'development',
  entry: "./server/main.ts",
  target: "node",
  watchOptions: {
    aggregateTimeout: 100,
    poll: true
  },
  stats: {
    warningsFilter: /^(?!CriticalDependenciesWarning$)/ //used for compiling express app
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js"
  },
  module: {
    rules: [
      {
        test: /\.txt$/i,
        use: 'raw-loader',
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              transpileOnly: true,
              configFileName: path.resolve(__dirname, "excel_2/tsconfig.json")

            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devtool: 'source-map',
  externals: nodeModules,
  plugins: [
    <any>(new NodemonPlugin())
  ]
};

export default config;
