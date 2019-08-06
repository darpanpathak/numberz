const express = require('express');
const app = express();
const axios = require('axios');

const PORT = process.env.PORT || 3100;
const previousInvoices = [];

app.post("/invoices", async(req, res) => {
    try {
        const response = await axios.get("https://g1pm269blb.execute-api.us-west-2.amazonaws.com/default/invoice-numberz");

        if (response.data.rowCount > 0) {
            console.log("Row found :: ", response.data.rowCount);
            for (let i = 0; i < response.data.rowCount; i++) {
                const row = isObject(response.data.rows[i]) ? response.data.rows[i] : JSON.parse(response.data.rows[i]);
                const index = previousInvoices.findIndex(x => x.id === row.id);

                if (index === -1) {
                    await sendEmail(row);
                    previousInvoices.push(row);
                    await updateinvoice(row);
                } else {
                    console.log("Already sent !!", row.id);
                }
            }
        } else
            previousInvoices.length = 0;

        res.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
        res.end();
    } catch (err) {
        console.log(`Some error occured ${new Date()}`);
        res.writeHead(500, 'ERROR', { 'Content-Type': 'text/plain' });
        res.end();
    }
});

app.listen(PORT, () => {
    console.log(`Application started on port :: ${PORT}`);
});

function isObject(item) {
    return (typeof item === "object" && !Array.isArray(item) && item !== null);
}

function sendEmail(row) {
    return axios.post('https://9wth82zowd.execute-api.us-west-2.amazonaws.com/default/email-numberz', row);
}

function updateinvoice(row) {
    const dataToUpdate = { lastreminderon: new Date().toJSON() };
    return axios.put(`https://g1pm269blb.execute-api.us-west-2.amazonaws.com/default/invoice-numberz?id=${row.id}`, dataToUpdate);
}