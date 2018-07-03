var program = require('commander');
var path = require('path');
var fs = require('fs');
var http = require('https');
var lz = require('./lz-string.min.js')

const configPath = path.join(__dirname,'./screen.conf');
var config = {};

if(fs.existsSync(configPath)){
    try {
        config = JSON.parse(fs.readFileSync(configPath))
    } catch (error) {
        config = {}
    }
    
}
program
    .version(JSON.parse(fs.readFileSync(path.join(__dirname, '.', 'package.json'), 'utf8')).version)
    .option('-s,--screen <ID>','set screen ID where output info sent to it,reference readme.md')
    .option('-t,--type <Type>','type of output content')

var screenID = 0;

program
    .command('config')
    .description('create screen.conf')
    .action(function(){
        screenID = program.screen;
        if(!screenID){
            console.log("no screenID specified, reference readme.md")
            process.exit(0) 
        }
        var conf = {screenID};
        fs.writeFileSync(configPath,JSON.stringify(conf,null,2));        
        process.exit(0);
    })

program.parse(process.argv);

screenID = program.screen || config.screenID || 0;

var type = program.type || 'text';

console.log("screenID:",screenID);

// http.get({
//     "host":"www.zhanghongbing.cn"
// },res=>{
//     res.setEncoding('utf8');   
//     res.on('data', function (data) { 
//         console.log('res:'+data);   
//     });
// })


var dataList = []
var busy = false;

function send(chunk){
    
    console.log(chunk.toString());  
    dataList.push(chunk)

    if(busy)return;

    busy = true;
    
    while (dataList.length) {
        var s = dataList.shift()

        var req = http.request({
            host: 'www.zhanghongbing.cn',
            //host: '127.0.0.1',
            path: `/screen?ID=${screenID}&type=${type}&t=${(new Date).getTime()}`,
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
process.stdin.on('data',(chunk)=>{
    send(chunk)
})

//process.exit(0)