const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let products = [];

// Rota para a página inicial
app.get('/', (req, res) => {
    res.render('index', { products: products });
});

// Rota para adicionar um novo produto
app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { name, quantity, price } = req.body;
    products.push({ id: products.length + 1, name, quantity, price });
    res.redirect('/');
});

// Rota para editar um produto
app.get('/edit/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    res.render('edit', { product: product });
});

app.post('/edit/:id', (req, res) => {
    const { name, quantity, price } = req.body;
    const product = products.find(p => p.id == req.params.id);
    product.name = name;
    product.quantity = quantity;
    product.price = price;
    res.redirect('/');
});

// Rota para deletar um produto
app.get('/delete/:id', (req, res) => {
    products = products.filter(p => p.id != req.params.id);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
