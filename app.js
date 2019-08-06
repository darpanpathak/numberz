const express = require('express');
const app = express();
const db = require('./dbManager');
const dotenv = require('dotenv');
dotenv.config();

const PORT = "3200";

app.get('/db', (req, res) => {
    db.getAll().then(response => {
        console.log(response);
        if (response)
            sendResponse(200, response, res);
        else
            sendResponse(404, "Nothing found", res);

    }, (reject) => {
        sendResponse(400, reject, res);
    });
});

app.put('/invoices', (req, res) => {
    res.send(await db.updateInvoice("efab8d7c-2942-4883-8831-5ae5840c87c0", { lastreminderon: '2019-08-04T11:00:00z' }));
})

app.listen(PORT, async() => {
    console.log("Started listening");
    await db.updateInvoice("efab8d7c-2942-4883-8831-5ae5840c87c0", { lastreminderon: new Date().toJSON() })
});

function sendResponse(statusCode, message, res) {
    const response = {
        statusCode: statusCode,
        body: message
    };
    res.send(response);
}