var fs = require('fs')
var http = require('http');
var express = require('express');
var app = express();
var querystring = require('querystring');//post需要
// home list
var home = ""
var readerStream = fs.createReadStream('textpost.json');
readerStream.setEncoding('UTF8');
readerStream.on('data', function(chunk) {
   home += chunk;
});

app.get('/', function (req, res) {
   res.setHeader("Access-Control-Allow-Origin", "*");//跨域
   res.send(home);
})
//textpost
var text = ""
var item =  new Object();
/*var writerStream = fs.createWriteStream('textpost.json');

    writerStream.on('data', function(chunk) {
	    text += chunk;
	    text.push(item)
	    console.log(1)
	});
	writerStream.write(text,'UTF8');*/
	
app.get('/textpost', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");//跨域    
    item.title = req.query.title
    item.content = req.query.content
    item.type = req.query.type
    item.time = req.query.time
    item.comment = req.query.comment
    item.zan = req.query.zan

	fs.readFile('textpost.json','utf8',function(err,data){
		if(err) throw err;
    	var jsonObj = JSON.parse(data);
    	jsonObj.object.list.unshift(item)
    	jsonObj = JSON.stringify(jsonObj)
    	fs.writeFile('textpost.json',jsonObj,function(err){
	        if(err) throw err;
	        console.log(jsonObj);
	    });
	})
	
    res.send("提交成功");
})
server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
