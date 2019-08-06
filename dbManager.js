'use strict';

const { Client } = require('pg');
const util = require('./util');

const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});
client.connect();

module.exports.getAll = () => {
    try {

        const query = `isreminderenabled = true
        AND ispaid = false 
        AND (lastreminderon = null OR (nextreminderon BETWEEN now()::timestamp - (interval '2 minute') AND now()::timestamp))`

        return new Promise((resolve, reject) => {
            client.query(`SELECT * FROM invoices WHERE ${query}`, (err, res) => {

                if (err)
                    throw new Error(err);
                else
                    resolve({ rows: res.rows, rowCount: res.rowCount });
            });
        });
    } catch (err) {
        console.log("ERROR ::", err);
        return new Promise(() => {
            throw new Error(err)
        });
    }
}

module.exports.updateInvoice = (id, data) => {
    try {

        data = util.isObject(data) ? data : JSON.parse(data);
        console.log("params ::", id, data);

        let query = "";
        const keys = Object.keys(data);

        for (let i = 0; i < keys.length; i++) {
            query += `${i !==0 ? 'AND' : ''} ${keys[i]} = '${data[keys[0]]}'`;
        }

        return new Promise((resolve, reject) => {

            client.query(`UPDATE invoices SET ${query} WHERE id='${id}'`, (err, res) => {

                if (err)
                    reject(err);
                else
                    resolve({ rowCount: res.rowCount });
            });

        });


    } catch (err) {
        console.log("GLOBAL ERROR::", err);
        return new Promise(() => {
            throw new Error({...err, msg: "Some error occured" });
        });
    }
}