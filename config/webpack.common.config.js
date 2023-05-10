const path = require('path');

const resolve = (_path) => {
    return path.resolve(__dirname, _path);
};

module.exports = {
    entry: './src/index.ts',
    output: {
        clean: true,
        path: resolve('../build'),
        filename: './bundle.js',
    },
    resolve: {
        // 把 `.ts` 和 `.tsx` 文件设置为可解析拓展名
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            // 所有 `.ts` 和 `.tsx` 文件都通过 `ts-loader` 解析
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            }
        ]
    },
};
