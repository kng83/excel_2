import NodemonPlugin from 'nodemon-webpack-plugin';


export default class NewNodemonPlugin extends NodemonPlugin{
    apply(compiler) {
        compiler.hooks.done.tap('Hello World Plugin', (
          stats /* stats is passed as an argument when done hook is tapped.  */
        ) => {
          console.log('Hello World!');
        });
      }
}

