import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json';

const banner =
    '/*!\n' +
    ` * ${pkg.name} v${pkg.version}\n` +
    ` * (c) ${new Date().getFullYear()} zengqiu\n` +
    ' * Released under the MIT License.\n' +
    ' */';

export default [
    // browser-friendly UMD build
    {
        input: 'src/index.js',
        output: {
            name: 'array-tree',
            file: pkg.unpkg,
            format: 'umd',
            banner
        },
        plugins: [
            babel({
                babelHelpers: 'bundled',
                exclude: ['node_modules/**']
            }),
            terser()
        ],
    },

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    {
        input: 'src/index.js',
        output: [
            { file: pkg.main, format: 'cjs', banner },
            { file: pkg.module, format: 'es', banner }
        ],
        plugins: [
            babel({
                babelHelpers: 'bundled',
                exclude: ['node_modules/**']
            }),
            terser()
        ],
    },
];