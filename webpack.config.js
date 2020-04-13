const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const entry_points = {
    'index' : [
        `./src/entrypoints/index.js`,
        `./src/styles/main.less`
    ]
};

module.exports = (env, argv) => {
    const is_prod = argv.mode === 'production';

    return {
        mode: is_prod ? 'production' : 'development',
        target: 'electron-renderer',
        context: __dirname,
        entry: entry_points,
        output: {
            path: path.resolve(__dirname, 'build/dist/'),
            filename: '[name].bundle.js',
            publicPath: '/dist/'
        },
        resolve: {
            modules: ['node_modules'],
            extensions: ['.js', '.jsx', '.css', '.less']
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        {loader: 'style-loader'},
                        {loader: 'css-loader'}
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        {loader: MiniCssExtractPlugin.loader},
                        {loader: 'css-loader'},
                        {loader: 'less-loader'}
                    ]
                }
            ]
        },
        plugins: [
            // Достаем CSS в отдельные бандлы
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
        ],
        devtool: 'source-map',
        watchOptions: {
            aggregateTimeout: 1000
        }
    };
};
