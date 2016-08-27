var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var port = 3008

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	noInfo: true,
	historyApiFallback: true
}).listen(port, '127.0.0.1', function(err, result) {
	if (err) {
		console.log(err);
	}
	console.info("==> Listening on port %s - http://localhost:%s/webpack-dev-server/", port, port)
});