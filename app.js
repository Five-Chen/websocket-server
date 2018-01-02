const WebSocketServer = require('ws').Server;

var ws = new WebSocketServer({
	port:6543, //Listen Port
	verifyClient: socketVerify //用于验证连接的函数
});

function socketVerify (info) {
	// 做一些事情来验证连接的合法性，如果允许连接则 return true, 否则 return false
	let origin = info.origin.match(/^(:?.+\:\/\/)([^\/]+)/);
	if(origin.length >= 3) {
		return true;
	}
	return false;
}

wx.on('connection',function(wsocket){
	wsocket.on('message', message);
	wsocket.on('close', close);
	wsocket.on('error', error);
	wsocket.on('open', open);
});

function message (msg) {
	//对接收到的消息做的操作
}

function error (err) {
	//处理错误
}

function close () {
	//连接关闭时的操作
}

function open () {
	//连接开启后做的操作
}