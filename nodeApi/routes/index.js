// Routes/index.js
//Controller

//http://192.168.0.41:3000/

const express = require('express');
const router = express.Router();
const mysql = require('mysql');
//cheerio API 자바스크립트 크롤링 api↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
const axios = require('axios');
const cheerio = require('cheerio');

//db key config로 관리하기
const db = mysql.createConnection({
    // host: 'localhost',   
    // user: 'root',
    // password: '2848',
    // database: 'bacode'

  //  host: '127.0.0.1',
   // user: 'root',
   // password: 'qkrtjdgh123!',
   // database: 'mydatabase'

   host: 'localhost',   
   user: 'root',
   password: '4865',
   database: 'barcoder'
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
// 비동기적으로 가져와야한다. async ...
// 순서 : 데이터베이스에 바코드 넘버가 있는지, → 데이터베이스에 바코드 이미지가 있는지 → 바코드 이름이 있는지
router.get('/barcodePage/', async(req,res) => {

    // result 객체 초기화 = 데이터 자동으러 얻와 점점 채우는 작업 그리고 return
    let barcodeData = [{
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
        if (result.length === 0) {
            console.log("데이터를 찾을 수 없습니다. 새로운 데이터를 추가합니다.");
            const addedBarcodeResult =  addBarcodeNumData(barcodeNumData, res); //error를 띄우기위해 rout핸들러인 res를 전달해줘서 사용한다.
            // 다시 요청하기를 유도해서 데이터 추가를 노리자
        }
        
        //만약 imageUrl이 없다면 크롤링해서 구해오기 --→ 구해와서 db에 넣기 함수
        if(barcodeData[0].imageUrl == null){
            console.log("이미지 데이터가 없습니다.")
            const crowlImgUrl =  await getImgUrl(barcodeNumData); //beepscan 서버에 이미지 값 가져오기 (크롤링)
            console.log("이미지url 크롤링함수에서 받은 데이터",crowlImgUrl);
    
            if(crowlImgUrl != null){ //imgUrl 함수 실행 결과값이 있다면 db에 추가하고 초기화 값에 추가하기
                updateBarcodeImageUrl(barcodeNumData,crowlImgUrl);
                barcodeData[0].imageUrl= crowlImgUrl;
            }else{
                console.log("데이터를 구하지 못했습니다.")
            }
        }
        //barcodeData를 채우는 작업
        barcodeData[0].barcodeNum = barcodeNumData;

        res.send(result);
    })
})


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

const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

// MariaDB 연결 설정
const pool = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'yourUsername',
  password : 'yourPassword',
  database : 'yourDatabaseName'
});

// 문의 사항 제출 API
app.post('/submit-question', (req, res) => {
  const { title, content, answerPassword } = req.body;
  
  // SQL 쿼리를 사용하여 데이터베이스에 데이터 삽입
  pool.query('INSERT INTO contact_answer (title, content, answer_password) VALUES (?, ?, ?)', 
             [title, content, answerPassword], (error, results, fields) => {
    if (error) {
      return res.status(500).send({ message: '문의 제출 중 오류가 발생했습니다.', error: error });
    }
    
    res.status(201).send({ message: '문의가 성공적으로 제출되었습니다.', id: results.insertId });
  });
});

// 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행중입니다.`);
});

