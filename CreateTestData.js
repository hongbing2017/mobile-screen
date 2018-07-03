(function createData(){

    var n=0;
    var t = setInterval(()=>{
        if(n++<5){
            console.log(`this is test output: \u001b[31m ${n} \u001b[0m`)
        }else{
            clearInterval(t)
        }
    },1000)
})()

