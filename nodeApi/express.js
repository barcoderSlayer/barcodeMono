// app.js

//http 보안상의 이유로 cors를 설치해야한다 자세한 내용 https://fomaios.tistory.com/entry/Network-CORS%EB%9E%80-feat-%EB%B3%B4%EC%95%88HTTP
// express 사용
const express = require("express");

//controller에 요청
const indexRouter = require('./routes/index');


const app =express();
//router
app.use('/', indexRouter);

app.listen(3000,() => {
    console.log("server onload")
});


