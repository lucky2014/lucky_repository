简洁 轻量 快速 数据驱动 模块友好 组件化

## 开发步骤

1. 需求分析
2. 项目以来初始化
3. 入口文件编码
4. 创建视图
5. 测试前端流程
6. 样式开发，伪造模板数据
7. 设计数据库模型
8. 开发后端逻辑
9. 配置以来文件，网站开发结束

## 设计数据库模型

我们使用的数据库工具是mongoose，它能对mongodb进行数据建模左右一个操作。

1. Schema->Model->Documents，模式、模型和文档
2. Mongoose
3. Mongodb


**### 模式定义：Schema**

<pre>var mongoose = require("mongoose")

var MovieSchema = new mongoose.Schema({
    doctor: String,
    title: String,
    language: String,
    country: String,
    year: Number,
    summary: String,
    _id: Number
})</pre>


**### 变异模型: Model**

<pre>var mongoose = require("mongoose")
var MovieSchema = require("../schemas/movie")

var Movie = mongoose.model({
    'Movie',
    MovieSchema
})

moduel.exports = Movie</pre>

**### 文档实例化： Documents**

<pre>var Movie = require("./models/movie")

var movie = new Movie({
    title: "机械战警",
    doctor: "何清梅",
    year: 2018
})

movie.save(function(err){
    if(err) return handleError(err)
})</pre>
<>