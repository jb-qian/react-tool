const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssModuleToString = require('./loader/CssModuleToString/index');

module.exports = {
    entry: path.resolve(__dirname, './dist/npm.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'cat-react-tool.css'
        }),
        new CssModuleToString(),
    ],
    module: {
        rules: [{
            test: /\.(css|less)$/,
            loader: CssModuleToString.loader,
        },{
            test: /\.(css|less)$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, {
                    loader: require.resolve('css-loader'),
                    options: {
                        importLoaders: 1,
                        minimize: true,
                        modules: true,
                        localIdentName: 'cat__[name]__[local]__[hash:5]',
                    },
                },
                {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            require('postcss-preset-env')({
                                autoprefixer: {
                                    flexbox: 'no-2009',
                                },
                                stage: 3,
                            }),
                        ],
                    },
                },
                {
                    loader: require.resolve('less-loader'),
                },
            ],
            // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
        }, {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx|less)$/, /\.html$/, /\.json$/],
            options: {
                name: 'static/media/[name].[hash:8].[ext]',
            },
        }, ]
    },
    externals: {
        "react": 'React',
        'react-dom': 'ReactDOM'
    },
    // resolve: {
    //     extensions: ['.tsx', '.ts', '.js']
    // },
}