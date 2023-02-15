const stream = require('./dist/index');
const path = require('path');

stream
  .default({
    input: path.join(__dirname, '../renderer/mdx/archive'),
    output: 'build',
    inputOption: {
      ignore: '*haskell/**',
    },
  })
  .then(() => {});
