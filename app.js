const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

let items = []
let workItems = []


app.get('/', function (req, res) {
    let today = new Date();

    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }
    let day = today.toLocaleDateString('pt-br', options)

    res.render('list', { listTitle: day, newListItems: items });
});


app.post('/', function (req, res) {

    let item = req.body.newItem

    if (req.body.list === 'Work') {
        workItems.push(item)
    } else {
        items.push(item)
        res.redirect('/')
    }
})

app.get('/work', function (req, res) {
    res.render('list', { listTitle: "Lista de Trabalho", newListItems: workItems })
})


app.listen(3000, function () {
    console.log('Server started on PORT 3000');
});