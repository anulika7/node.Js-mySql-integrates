var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodejes',
  debug: false
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/index', function (req, res, next) {
  res.render('index');
})

//data connection
router.get('/tabeldata', function(req, res, next){
  if(db != null){
    res.send('database terhubung');
  }else{
    res.send('ilang koneksinya')
  }
});

//display data
router.get('/data', function(req, res, next){
  db.query('SELECT * FROM tb_item', function(err, rs){
    res.render('data', {itemnya: rs});
  });
});


//for dynamic data input or update forms
router.get('/inputdata', function (req, res, next) {
    res.render('inputdata', {item: {}});
});

//data added function
router.post('/inputdata', function (req, res, next) {
  db.query('INSERT INTO tb_item SET ?', req.body, function (err, rs){
    res.redirect('/data');
  })
})

//delete data function
router.get('/hapusdata', function (req, res, next) {
  db.query('DELETE FROM tb_item WHERE id=?', req.query.id, function (err, rs) {
    res.redirect('/data');
  })
});

//for dynamic data input or update forms
router.get('/editdata', function (req, res, next) {
  db.query('SELECT * FROM tb_item WHERE id=?', req.query.id, function (err, rs) {
    res.render('inputdata', {item: rs[0]});
  })
});


//data update function
router.post('/editdata', function (req, res, next) {
  var param =[
    req.body,
    req.query.id
  ]
  db.query('UPDATE tb_item SET ? WHERE id=?', param, function(err, rs) {
    res.redirect('/data');
  })
})


module.exports = router;
