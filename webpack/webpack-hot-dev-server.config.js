module.exports = require('./make-webpack-config')({
    devServer: true,
    hotComponents: true,
    separateStylesheet: true,
    devtool: 'eval',
    debug: true
});
