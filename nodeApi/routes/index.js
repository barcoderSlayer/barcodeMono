//Controller

const express = require('express');
const app = express();
const port = 3000;

app.get('/', req,res) => {
    const responseObject ={
        key: 'value',
        key2: 'value2'
        //costom
    };

    res.send(responseObject);
}



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });