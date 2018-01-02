var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function(req, res){
	res.send(`<h1>Welcome Realtime Server</h1>`);
})

//Online users
var onlineUsers = {};

//Online User count
var onlineCount = 0;

io.on('connection', function(socket){
	console.log('A user connnected');

	//listen new user login
	socket.on('login', function(obj){
		//将新加入的用户的唯一标识当作socket的名称，后面用户退出的时候会用到
		socket.name = obj.userid;

		//检查子啊先列表，如果不在里面就加入
		if(!onlineUsers.hasOwnProperty(obj.userid)) {
			onlineUsers[obj.userid] = obj.username;
			//在线人数+1
			onlineCount++;
		}
	});

	//listen user logout
	socket.on('disconnect', function(){
		if(onlineUsers.hasOwnProperty(socket.name){
			//退出用户的信息
			var obj = {
				userid:socket.name,
				username:onlineUsers[socket.name]
			};

			//删除
			delete onlineUsers[socket.name];
			//在线人数-1
			onlineCount--；

			//向所有客户端广播用户退出
			io.emit('logout', {
				onlineUsers:onlineUsers,
				onlineCount:onlineCount,
				user:obj
			})

			console.log(obj.username + '退出了聊天室');
		})
	});

	//监听用户发布聊天内容
	socket.on('message', function(obj){
		//向所有客户端广播发布的消息
		io.emit('message',obj);
		console.log(obj.username + '说：' + obj.content);
	})
})