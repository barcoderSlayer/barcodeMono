// Routes/index.js
//Controller

//http://192.168.0.41:3000/
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
//cheerio API 자바스크립트 크롤링 api↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
const axios = require('axios');
const cheerio = require('cheerio');
const config= require('../config');
const OpenAI   = require('openai');


//DataBaseKey
const db = mysql.createConnection({
    host: config.DB_HOST,   
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE
})

//db 연결 확인
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');

    const sql = 'show tables;';
    db.query(sql,(err, result) => {
        if (err) throw err;
        // console.log(result);
        console.log("connected!!!", result);
    })
})

// query 메서드를 Promise로 변환 
const util = require('util');
const queryAsync = util.promisify(db.query).bind(db);


//router로 get 요청받기 test
router.get('/', (req,res) => {
    console.log('/', "로 요청을 보냈습니다.")
    const responseObject ={
        key: 'value',
        key2: 'value2'
        //costom
    };
    res.send(null);
});

//barcodePage
//http://10.20.16.90:3000/barcodePage/?barcodeNumData=300450444394
// http://192.168.0.41:3000/barcodePage/?barcodeNumData=300450444394
// https://www.beepscan.com/barcode/88002798
// 비동기적으로 가져와야한다. async ...
// 순서 : 데이터베이스에 바코드 넘버가 있는지, → 데이터베이스에 바코드 이미지가 있는지 → 바코드 이름이 있는지
router.get('/barcodePage/', async(req,res) => {

    // result 객체 초기화 = 데이터 자동으러 얻와 점점 채우는 작업 그리고 return
    var barcodeData = [{
        barcodeNum: null,
        productNameKr: null,
        productNameEn: null,
        scanCnt: null,
        imageUrl: null,
        division: null
    }];
    const barcodeNumData = req.query.barcodeNumData;
    console.log('/barcodePage/barcodeNumData :', barcodeNumData )
    
    const sql = `select * from products where barcodeNum = '${barcodeNumData}'`;
    db.query(sql, async(err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('서버 오류, 바코드가 없습니다. 인스턴스를 추가하겠습니다.');
            return
        }
        
        // 데이터베이스에서 레코드를 가져왔는데 결과가 없으면 새로운 데이터 추가
        if (result.length == 0) {
            console.log("데이터를 찾을 수 없습니다. 새로운 데이터를 추가합니다.");
            const addedBarcodeResult =  addBarcodeNumData(barcodeNumData, res); //error를 띄우기위해 rout핸들러인 res를 전달해줘서 사용한다.
            // 다시 요청하기를 유도해서 데이터 추가를 노리자
        } else{ 
               // DB에서 가져온 데이터를 barcodeData에 채워넣기
        let dbData = result[0]; // 예제로 간단하게 첫 번째 레코드만 가져오도록 했습니다.
        barcodeData[0].barcodeNum = dbData.barcodeNum;
        barcodeData[0].productNameKr = dbData.productNameKr;
        barcodeData[0].productNameEn = dbData.productNameEn;
        barcodeData[0].scanCnt = dbData.scanCnt;
        barcodeData[0].imageUrl = dbData.imageUrl;
        barcodeData[0].division = dbData.division;
        }

        //만약 productNameKr 이 null 이라면
        if(barcodeData[0].productNameKr == null){
            console.log("한글 상품 이름이 없습니다.");
            const crowlName = await getProductNameKr(barcodeNumData);
            console.log("한글 상품 크롤링해서 받은 이름",crowlName)

            if(crowlName != null){
                // 상품이름을 얻었다면 데이터 베이스에 넣기
                console.log('데이터 베이스에 채워두겠습니다.',`${crowlName}`);
                updateBarcodeProductName(barcodeNumData,crowlName);
                barcodeData[0].productNameKr = crowlName;
            }else{
                console.log("데이터의 이름을 구하지 못하였습니다.")
            }
        }

        //만약 imageUrl이 없다면 크롤링해서 구해오기 --→ 구해와서 db에 넣기 함수
        if(barcodeData[0].imageUrl == null){
            console.log("이미지 데이터가 없습니다. 크롤링 해오겠습니다.")
            const crowlImgUrl =  await getImgUrl(barcodeNumData); //beepscan 서버에 이미지 값 가져오기 (크롤링)
            console.log("이미지url 크롤링함수에서 받은 데이터",crowlImgUrl);
    
            if(crowlImgUrl != null){ //imgUrl 함수 실행 결과값이 있다면 db에 추가하고 초기화 값에 추가하기
                updateBarcodeImageUrl(barcodeNumData,crowlImgUrl);
                barcodeData[0].imageUrl= crowlImgUrl;
            }else{
                console.log("이미지 데이터를 구하지 못했습니다.");
            }
        }
        //barcodeData를 채우는 작업
        barcodeData[0].barcodeNum = barcodeNumData;

        console.log("데이터를 보내겠습니다.", result)
        res.send(result);
    })
})
//↑↑↑↑문제점이 크롤링한 데이터를 바로 프론트에 전달해주지 못하고 db에 등록한것을 다시 불러와야하는 단점의 알고림즈
//↑↑ 문제는 아마 비동기 처리를 하지않았기때문이다.


//gpt에게 요청하는 함수
const callGpt35 = async(prompt) =>{
    const myApiKey=config.GPT_APIKEY;

    try{
        const openai = new OpenAI({apiKey:myApiKey});

        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
        })

        // console.log(chatCompletion.choices[0].message);
        return chatCompletion.choices[0].message

        // 실패코드
        // const response = await openai.createChatCompletion({
        //     model: "gpt-3.5-turbo",
        //     messages:[{role:"user", content:prompt}],
        // });
        // return response.data.choices[0].message;


        //성공 코드
        // const gptResponse = await openai.complete({
        //     engine: 'text-davinci-003',
        //     prompt: 'say hello word',
        //     maxTokens: 5,
        //     temperature: 1.2,
        //     topP: 1,
        //     presencePenalty: 0,
        //     frequencyPenalty: 0,
        //     bestOf: 1,
        //     n: 1,
        //     stream: false,
        //     stop: ['\n', "testing"]
        // });
        // console.log(gptResponse.data);


    }catch(error){
        console.error('callGpr35() error >>>', error);
        return null;
    }

}

//gpt에게 데이터 요청리스너 조건 : gpt요청은 텍스트 값이 있을때만 시도해볼 수 있다.
router.post('/chat', async(req, res)=> {
    const productNameData = req.query.productNameData;
    //나무위키에 검색해서 html 가져오는 메서드

    //html 제공해주고 상품에대해 설명해달라는 메서드
    const prompt = `https://namu.wiki/w/${productNameData} 사이트 참고해서 ${productNameData}에 대해 조건에 맞게 설명해줘. 
    조건) - 200자 내외로 요약
    - 한국어로 설명
    - 사이트 참고하지 못할경우 아는 내용 설명
    - 정확하지 않은 정보면 '잘 모르겠습니다 출력'`;
    console.log(prompt);
    // getHtml(productNameData);
    const response = await callGpt35(prompt);

    if(response){
        res.send({'response' : response});
        console.log('/chat에서 값을 return했습니다.',response);
    }else{
        res.status(500).json({'error' :'Fail'})
    }
});

//나무위키에서 html 텍스트 가져와서 설명에 보충하기 gpt 간식
// async function getHtml(productNameData){
//     let productHtml = null;
//     try{
//         console.log(productNameData, '의 나무위키 HTML ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓');
//         const htmlSource = [];
//         // axios후 크롤링
//         const response = await axios.get(`https://namu.wiki/w/${productNameData}`);
//                 const $ = cheerio.load(response.data); //html 받아오기
                
//                 //html 전체를 가져와서 한글만 정제
//                 // const koreanText = $.html().match(/[가-힣]+/g).join(' ');
//                 // console.log(koreanText);
                

//                 //p태그 가져와서 주요 키워드가 포함된 녀석만 가져오기
//                 const keyword = productNameData;
//                 const extractedSentences = [];


//                 // $('div:contains('+keyword+')').each((index, element) => {
//                 //     const paragraph = $(element).text();
//                 //     if (paragraph.includes(keyword)) {
//                 //         extractedSentences.push(paragraph);
//                 //     }
//                 // });
//                 // console.log(extractedSentences);


//                 const maxResults =2;// 최대 가져올 수
//                 const minCharCount =100; // 최소 문자 수 
//                 // h2 바로 다음 div값 데이터 가져오기
//                 $('h2').next().find('div').each((index, smallestDiv) => {
//                     if (extractedSentences.length < maxResults) {
//                         const paragraph = $(smallestDiv).text().trim();

//                         if (paragraph.includes(keyword) && paragraph.length >= minCharCount) {
//                             extractedSentences.push(paragraph);
//                         }
//                     } else {
//                         return false; // 최대 결과 수에 도달하면 반복 중단
//                     }
//                 });
//                 console.log(extractedSentences);

            

//     }catch(error){
//         console.log("getImgUrl에서 에러 발생", error)
//         throw error;
//     }
//     return productHtml;
// }


//사이트 서버에서 이미지 소스 크롤링
async function getImgUrl(barcodeNumData){
    let imageUrl = null;
    try{
        console.log(barcodeNumData, '의 이미지 데이터 = ↓');
        const imgUrlArray = [];
        // axios후 크롤링
        const response = await axios.get(`https://www.beepscan.com/barcode/${barcodeNumData}`);
                const $ = cheerio.load(response.data); //html 받아오기
                
                $('div.card>img').each((index, item) =>{
                    console.log("크롤링 해온 imageUrl은",item.attribs.src); //item에서 attribs class 안에 src만 받아오기
                    imgUrlArray.push(item.attribs.src);
                    //얻어온url을 db 이미지에 넣기
                }); //이미지 가지고오기
            imageUrl = imgUrlArray.length > 0 ? imgUrlArray[0] : null;

    }catch(error){
        console.log("getImgUrl에서 에러 발생", error)
        throw error;
    }
    return imageUrl;
}

// 사이트에서 상품이름 크롤링 해오기
async function getProductNameKr(barcodeNumData){
    let productName = null;
    try{
        console.log(barcodeNumData, '의 상품명 한글 데이터 = 크롤링하기');
        const productNameArr = [];
        // axios후 크롤링
        const response = await axios.get(`https://www.beepscan.com/barcode/${barcodeNumData}`);
                const $ = cheerio.load(response.data); //html 받아오기
                
                $('div.container>p>b').each((index, item) =>{
                    console.log("크롤링 해온 상품명 = ",$(item).text().trim()); //item에서 attribs class 안에 src만 받아오기
                    productNameArr.push($(item).text());
                    //얻어온url을 db 이미지에 넣기
                }); //이미지 가지고오기
                productName = productNameArr.length > 0 ? productNameArr[0] : null;

    }catch(error){
        console.log("getProductNameKr에서 에러 발생", error)
        throw error;
    }
    return productName;
}


//바코드 데이터가 없다면 없다면 추가하기
//예외처리를 해줘야할까? 데이터가 없다면 추가하는 코드인데
async function addBarcodeNumData(barcodeNum){
    console.log("데이터 베이스에... ",barcodeNum," ...데이터를 추가합니다")
    const insertSql = `Insert into products (barcodeNum) values ('${barcodeNum}')`

    try{
        const result = new Promise((resolve, reject) =>{
            db.query(insertSql, (err, result) =>{
                if(err){
                    console.error(err);
                    reject('바코드 데이터 추가중 에러 => addBarcodeNumData ERR')
                }else {
                    console.log("바코드 데이터를 추가했습니다.",result);
                    resolve(result);
                }
            });
        });
        return result;
    }  catch(error){
        throw error; //호출하는 곳에서 에러 처리
    } 
}

//데이터 베이스에 상품 이름이 없다면 추가 함수
async function updateBarcodeProductName(barcodeNum, productName){
    console.log("데이터 베이스에... ",barcodeNum," 에","productName을 추가합니다 : ",productName);
    const updateProductNameSql = `UPDATE products set productNameKr = '${productName}' where barcodeNum = '${barcodeNum}'`

    try{
        const result =await new Promise((resolve, reject) =>{
            db.query(updateProductNameSql, (err, result) =>{
                if(err){
                    console.error(err);
                    reject('바코드 데이터 추가중 에러 => addBarcodeNumData ERR')
                }else {
                    console.log("바코드 데이터를 추가했습니다.",result);
                    resolve(result);
                }
            });
        });
        return result;
    }  catch(error){
        throw error; //호출하는 곳에서 에러 처리
    } 
}

//데이터에 바코드 이미지가 없다면 추가 함수
async function updateBarcodeImageUrl(barcodeNum, imageUrl){
    console.log("데이터 베이스에... ",barcodeNum," 에","imageUrl을 추가합니다 : ",imageUrl);
    const updateImagUrlSql = `UPDATE products set imageUrl = '${imageUrl}' where barcodeNum = '${barcodeNum}'`

    try{
        const result =await new Promise((resolve, reject) =>{
            db.query(updateImagUrlSql, (err, result) =>{
                if(err){
                    console.error(err);
                    reject('바코드 데이터 추가중 에러 => addBarcodeNumData ERR')
                }else {
                    console.log("바코드 데이터를 추가했습니다.",result);
                    resolve(result);
                }
            });
        });
        return result;
    }  catch(error){
        throw error; //호출하는 곳에서 에러 처리
    } 
}

router.get('/api/rankings', async (req, res) => {
    try {
        const sql = 'SELECT * FROM products ORDER BY scanCnt DESC LIMIT 10';
        const rankings = await queryAsync(sql);
        console.log('Rankings:', rankings); // 결과를 콘솔에 출력
        res.json(rankings);
    } catch (err) {
        console.error('Error fetching rankings:', err);
        res.status(500).send(err);
    }
});

module.exports = router;


const helmet = require('helmet');
require('dotenv').config(); // 환경 변수 라이브러리

const appHospitals = express();
const appPharmacies = express();

const portHospitals = 4000;
const portPharmacies = 4001;

appHospitals.use(express.json());
appHospitals.use(helmet()); // 보안 헤더 설정

appHospitals.get('/api/hospitals', (req, res) => {
  const userLat = parseFloat(req.query.lat);
  const userLng = parseFloat(req.query.lng);
  if (isNaN(userLat) || isNaN(userLng)) {
    return res.status(400).send('Invalid latitude or longitude');
  }


  const query = `
    SELECT *, 
      (6371 * acos(
        cos(radians(?)) * cos(radians(latitude)) *
        cos(radians(longitude) - radians(?)) +
        sin(radians(?)) * sin(radians(latitude))
      )) AS distance 
    FROM hospitals
    HAVING distance < 1
    ORDER BY distance`;

  db.query(query, [userLat, userLng, userLat], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    res.json(results);
  });
});

appHospitals.listen(portHospitals, () => {
  console.log(`병원 서버가 포트 ${portHospitals}에서 실행 중입니다`);
});

appPharmacies.use(express.json());
appPharmacies.use(helmet());

appPharmacies.get('/api/pharmacies', (req, res) => {
  const userLat = parseFloat(req.query.lat);
  const userLng = parseFloat(req.query.lng);
  if (isNaN(userLat) || isNaN(userLng)) {
    return res.status(400).send('Invalid latitude or longitude');
  }

  const query = `
    SELECT *,
      (6371 * acos(
        cos(radians(?)) * cos(radians(latitude)) *
        cos(radians(longitude) - radians(?)) +
        sin(radians(?)) * sin(radians(latitude))
      )) AS distance
    FROM pharmacies
    HAVING distance < 1
    ORDER BY distance`;

  db.query(query, [userLat, userLng, userLat], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    res.json(results);
  });
});

appPharmacies.listen(portPharmacies, () => {
  console.log(`약국 서버가 포트 ${portPharmacies}에서 실행 중입니다`);
});
