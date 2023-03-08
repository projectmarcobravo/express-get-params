const express = require('express');
const app = express();
const hbs = require('hbs');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs');

app.use(myFakeMiddleware)
function myFakeMiddleware(req, res, next) {
    console.log('myFakeMiddleware was called!');
    req.secretValue = 'swordfish'
    next();
}

app.get('/', (req, res, next) => {
    res.render('index');
});

app.get('/login', (req, res, next) => {
    res.render('login')
})

app.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    
    if (email === 'ironhacker@gmail.com' && password === 'password') {
        res.send('Welcome')
    } else {
        res.send('Go away')
    }
})

app.get('/search', (req, res, next) => {
    res.send(req.query);
  });

app.get('/get-user-info', (req, res, next) => {
    res.render('user-info-form')
})

app.get('display-user-info', (req, res, next) => {
    const { name, age, superhero } = req.query;
    res.send(`
        Your name is ${name}
        Your age is ${age}
        Your favorite superhero is ${superhero}
    `)
})

app.get('/test', (req, res, next) => {
    let mySecret = req.secretValue;
    res.send(mySecret)
})

app.listen(3000, () => console.log('App listening on port 3000!'))