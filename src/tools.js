var http = require('https');
var lz = require('./lz-string.min.js')
var path = require('path');
var fs = require('fs');

module.exports={
    sendText
}

var dataList = []
var busy = false;

function sendText(screenID,user,password,chunk){
    var type = "text";

    console.log(chunk.toString());  
    dataList.push(chunk)

    if(busy)return;

    busy = true;
    
    while (dataList.length) {
        var s = dataList.shift()
        var path =  `/screen?ID=${screenID}&type=${type}&name=${user}&pwd=${password}&t=${(new Date).getTime()}`;
        console.log("request:",path)
        var req = http.request({
            host: 'www.zhanghongbing.cn',
            //host: '127.0.0.1',
            path,
            method: 'POST',
            headers: {
                'contentType': "text/plain"
            }
        }, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
                console.log(data);
            });
        });
        var s = lz.compressToBase64(s.toString());
        req.end(s)
    }
    busy = false;
}

