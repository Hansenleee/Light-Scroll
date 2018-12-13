/**
 * rollup config js
 */
import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

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
      babel({
        exclude: 'node_modules/**' // 只编译我们的源代码
      })
    ],
  }
]