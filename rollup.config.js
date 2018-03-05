/**
 * rollup config js
 */
import uglify from 'rollup-plugin-uglify'

export default [
  {
    input: './src/index.js',
    output: {
      file: './public/Lscroll.js',
      format: 'umd',
      name: 'Lscroll'
    }
  }, {
    input: './src/index.js',
    output: {
      file: './public/Lscroll-esm.js',
      format: 'es',
      name: 'Lscroll-esm'
    }
  }, {
    input: './src/index.js',
    output: {
      file: './public/Lscroll-min.js',
      format: 'umd',
      name: 'Lscroll'
    },
    plugins: [
      uglify({
        output: {
          // comments: /LScroll-类/,
        }
      }),
    ],
  }
]