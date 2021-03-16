const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/payment.html'));
});
app.post('/pay', (req, res) => {
    axios.post('https://online.yoco.com/v1/charges/', {
        token: req.body.token,
        currency: 'ZAR',
        amountInCents: 5000
    }, {
        headers: {
            'X-Auth-Secret-Key': 'sk_test_960bfde0VBrLlpK098e4ffeb53e1'
        }
    })
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.send(error.response.data);
        })
});

app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));