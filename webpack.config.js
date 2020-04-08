const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const entry_points_dir = 'src/entrypoints';
const entry_points = {
    'index' : [
        `./${entry_points_dir}/index.js`
    ]
};

module.exports = (env, argv) => {
    const is_prod = argv.mode === 'production';

    return {
        mode: is_prod ? 'production' : 'development',
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
        devtool: 'source-map',
        watchOptions: {
            aggregateTimeout: 1000
        }
    };
};
