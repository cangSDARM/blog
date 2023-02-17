const stream = require('./dist/index');
const path = require('path');

const renderer = path.join(__dirname, '../renderer');

stream
  .default({
    input: path.join(renderer, './mdx'),
    output: path.join(renderer, './pages'),
    inputOption: {
      ignore: '*haskell/**',
    },
    outputOption: {
      noCache: false,
      type: 'nextjs',
    },
  })
  .then(() => {});
