var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser"); 			

var port = process.env.PORT || 3000;

app.set("view engine", 'jade');
app.set("views", "./views")

app.use(bodyParser());
app.use(express.static(path.join(__dirname, "bower_components")))

app.listen(port);

//路由
app.get("/", function(req, res){
	res.render("pages/index", {
		title: "imooc 首页",
		movies: [
			{
				title: "机械战警",
				_id:1,
				poster: "http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"
			},
			{
				title: "机械战警",
				_id:2,
				poster: "http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"
			},
			{
				title: "机械战警",
				_id:3,
				poster: "http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"
			},
			{
				title: "机械战警",
				_id:4,
				poster: "http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"
			},
			{
				title: "机械战警",
				_id:5,
				poster: "http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"
			},
			{
				title: "机械战警",
				_id:6,
				poster: "http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"
			}
		]
	})
});


app.get("/list", function(req, res){
	res.render("pages/list", {
		title: "imooc 列表页",
		movies: [
			{
				_id: 1,
				doctor: "何清梅",
				country: "china",
				title: "机械战警",
				year: 2018,
				post: "http://r3.ykimg.com/05160000530EEB63675839160D0B79D5",
				language: "中文",
				flash: "http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
				summary: "这是何清梅的导演的首部电影，讲述的是一个流浪儿蜕变成霸道总裁的故事，请大家多多关照！"
			}
		]
	})
});

app.get("/admin", function(req, res){
	res.render("pages/admin", {
		title: "imooc 后台录入页",
		movie: {
			_id: 1,
			doctor: "",
			country: "",
			title: "",
			year: '',
			post: "",
			language: "",
			flash: "",
			summary: ""
		}
	})
});

app.get("/movie/:id", function(req, res){
	res.render("pages/detail", {
		title: "imooc 详情页",
		movie: {
			_id: 1,
			doctor: "何清梅",
			country: "china",
			title: "机械战警",
			year: 2018,
			post: "http://r3.ykimg.com/05160000530EEB63675839160D0B79D5",
			language: "中文",
			flash: "http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
			summary: "这是何清梅的导演的首部电影，讲述的是一个流浪儿蜕变成霸道总裁的故事，请大家多多关照！"
		}
	})
});


console.log("启动成功");