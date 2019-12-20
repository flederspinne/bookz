module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                loaders: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                    {
                        loader: require.resolve('sass-loader'),
                        options: {
                            sourceMap: true,
                            prependData: '@import "src/common/styles/index";',
                        }
                    }
                ],
            },
        ],
    },
}