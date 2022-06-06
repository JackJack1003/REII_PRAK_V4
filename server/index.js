const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mysql123',
  database: '414_prak',
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/api/get', (req, res) => {
  const sqlSelect = 'SELECT * FROM products';
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post('/api/insert', (req, res) => {
  const productName = req.body.productName;
  const productDesc = req.body.productDesc;
  const productPrice = req.body.productPrice;
  const productImage = req.body.productImage;
  console.log('tot hier');
  const sqlInsert =
    'INSERT INTO products (p_name, p_desc,  price, image, Seller_ID) VALUES (?,?,?,?,1)';
  db.query(
    sqlInsert,
    [productName, productDesc, productPrice, productImage],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post('/api/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sqlSignUp = 'INSERT INTO users (username, password) VALUES (?,?);';
  db.query(sqlSignUp, [username, password], (err, result) => {
    console.log(result);
  });
});

app.get('/', (req, res) => {
  const sqlSelect = 'SELECT * FROM products';
  console.log('yeet');
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});
app.listen(3001, () => {
  console.log('running on 3001');
});
