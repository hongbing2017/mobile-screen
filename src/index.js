#!/usr/bin/env node

var program = require('commander');
var path = require('path');
var fs = require('fs');
var tools = require('./tools')

const configPath = path.join(__dirname,'./screen.conf');
var config = {};

var screenID ;
var user ;
var password ;

if(fs.existsSync(configPath)){
    try {
        config = JSON.parse(fs.readFileSync(configPath))
        screenID = config.screenID || '';
        user  = config.user || '';
        password = config.password ||'';
    } catch (error) {
    }
}
program
    .version(JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')).version)
    .option('-s,--screen <ID>','set screen ID where info sent to it')
    .option('-u,--user <name>','user name')
    .option('-p,--password <pwd>','user password')

program
    .command('config')
    .description('create or view screen.conf')
    .action(function(){
        screenID = program.screen;
        user = program.user;
        password = program.password;

        if(!screenID && !user && !password){
            console.log("no screenID or user or password specified.")
            console.log("current config:\n%s",JSON.stringify(config,null,2))
            process.exit(0) 
        }
        if(screenID)config.screenID = screenID;
        if(user)config.user = user;
        if(password)config.password = password;
    
        fs.writeFileSync(configPath,JSON.stringify(config,null,2));        
        process.exit(0);
    })


//缺省行为    
program.parse(process.argv);

sscreenID = program.screen || screenID;
user = program.user || user;
password = program.password || password;

if(!screenID || !user || !password){
    console.log("no screenID or user or password specified, reference readme.md")
    process.exit(0) 
}

console.log("send to screenID:",screenID);

process.stdin.on('data',(chunk)=>{
    console.log(chunk)
    tools.sendText(screenID,user,password,chunk)
})


//process.exit(0)