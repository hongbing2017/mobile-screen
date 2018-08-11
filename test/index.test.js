'use strict'

//var expect    = require('chai').expect

describe('Mobile Screen 测试',function(){

    it('测试颜色支持', function(){
       
        console.log(`this is test output: \u001b[31m 文字 \u001b[0m`)
         
    })

    it('测试等宽文字',function(){
        var s=[
            "                    __    _ __",                                     
            "   ____ ___  ____  / /_  (_) /__     __________________  ___  ____", 
            "  / __ `__ \\/ __ \\/ __ \\/ / / _ \\   / ___/ ___/ ___/ _ \\/ _ \\/ __ \\",
            " / / / / / / /_/ / /_/ / / /  __/  (__  ) /__/ /  /  __/  __/ / / /",
            "/_/ /_/ /_/\\____/_.___/_/_/\\___/  /____/\\___/_/   \\___/\\___/_/ /_/ ",
            '',
          ]
        
        var greeting = s.join('\n')
        
        console.log(greeting)
    })
})