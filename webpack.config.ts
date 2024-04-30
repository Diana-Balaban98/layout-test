import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import {CleanWebpackPlugin} from "clean-webpack-plugin";

type Mode = "development" | "production";

type EnvVariables = {
    mode: Mode
    port: number
}

const devServer = (isDev: EnvVariables): {devServer: DevServerConfiguration} => {
    return isDev.mode && {
        devServer: {
            open: true,
            compress: true,
            hot: true,
            port: 8000,
            static: {
                directory: path.join(__dirname, "src")
            }
        }
    }
}

export default (env: EnvVariables) => {
    const config: webpack.Configuration = {
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        mode: env.mode === 'development' ? "development" : "production",
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash].js',
            assetModuleFilename: 'assets/[name][ext]',
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.[tj]s$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.html$/i,
                    loader: "html-loader",
                },
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(?:woff(2)|eot|ttf|otf)$/i,
                    type: 'asset/inline',
                    generator: {
                        filename: 'fonts/[name].[ext]'
                    }
                },
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
                {
                    test: /\.less$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "less-loader",
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        performance: {
            hints: false,
            maxAssetSize: 512000,
            maxEntrypointSize: 512000
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                title: "Test App",
                filename: 'index.html',
                favicon: "./src/public/icon.png",
            }),
            env.mode && new webpack.ProgressPlugin(),
            new CleanWebpackPlugin({
                cleanStaleWebpackAssets: true
            }),
            new CopyPlugin({
                patterns: [
                    {from: "./src", to: 'src'},
                ],
            }),
            new MiniCssExtractPlugin({filename: 'css/[name].[hash].css'})
        ].filter(Boolean),
        ...devServer(env)
    }

    return config;
};