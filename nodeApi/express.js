const express = require("express")
const app = express()

//http 보안상의 이유로 cors를 설치해야한다 자세한 내용 https://fomaios.tistory.com/entry/Network-CORS%EB%9E%80-feat-%EB%B3%B4%EC%95%88HTTP

app.get("/express", (req, res)=> {
    res.send("<h1>hello express</h1>")
})

app.listen(3000,() => {
    console.log("server onload")
})


