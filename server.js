var connect = require('connect'),
fs = require('fs');

var app = connect();
// setup the static file server
app.use(connect.static(__dirname));
// actually respond
app.use(function(req, res) {

console.log(req.url);
if(req.url=='/save'){

var img = "";
  req.on('data', function (chunk) {
    img += chunk.toString();
  });
  req.on('end', function () {
  	var data = img.replace(/^data:image\/\w+;base64,/, "");
var buf = new Buffer(data, 'base64');
fs.writeFile('image.png', buf);
console.log('file saved');
        
  });


}
});
app.listen(8000);

console.log('listening on port 8000');