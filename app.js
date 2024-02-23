const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoConnect = require('./util/database').mongoConnect;
const Calculation = require('./models/calculation');

const app = express();
const port = 2000;

app.use(bodyParser.json());

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));


app.get('/',(req,res,next)=>{
    res.render("index");
})

app.post('/saveCalculation', (req,res)=>{
    const {expression, result} = req.body;
    console.log(expression);
    console.log(result);
    const calculation = new Calculation(expression,result);
    calculation.save()
    .then(result=>{
        console.log("Inserted Calculation");

    })
    .catch(err=>{
        console.log(err);
    });
});

app.get('/calculations',(req,res,next)=>{
    Calculation.fetchAll()
    .then(result => {
        res.render('calculations',{
            values: result
        });

    })
    
});

app.post('/delete',(req,res,next)=>{
    const calId =  req.body.calId;
    console.log(calId,"sjfkjahfk")
    Calculation.deleteById(calId)
    .then(()=>{
        console.log("deletedd");
        res.redirect('/calculations')

    })
    .catch(err=>console.log(err))

})



mongoConnect(client => {
    console.log(client);
    app.listen(port);
});
