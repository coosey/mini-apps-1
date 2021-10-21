// import necessary materials
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const db = require("./database");

app.use(express.static("public"));
app.use(cors);
app.use(morgan("dev"));

// set POST request
app.post('/customer', (req, res) => {
    let {name, email, password, address1, address2, city, state, zip_code, phone, card_number, expiry_date, billing_zipcode} = req.body;
    queryStr = `INSERT INTO customer (name, email, password, address1, address2, city, state,
                zip_code, phone, card_number, expiry_date, billing_zipcode) VALUES
                ("${name}", "${email}", "${password}", "${address1}", "${address2}", "${city}", "${state}", ${zip_code}, ${phone}, ${card_number}, ${expiry_date}, ${billing_zipcode})`;
    db.query(queryStr, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('FAILED');
        } else {
            console.log('User data stored');
            res.status(201).send(results);
        }
    })
})

// create port & app.listen
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});


module.exports = app;