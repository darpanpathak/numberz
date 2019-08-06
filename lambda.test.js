const lambdaLocal = require('lambda-local');
const path = require('path');
var jsonPayload = {
    httpMethod: 'GET',
    queryStringParameters: {
        id: 'efab8d7c-2942-4883-8831-5ae5840c87c0'
    },
    body: { lastreminderon: '2019-08-04T11:00:00z' }
}

lambdaLocal.execute({
    event: jsonPayload,
    lambdaPath: path.join(__dirname, 'index.js'),
    lambdaHandler: 'invoiceHandler',
    timeoutMs: 3000,
    envfile: path.join(__dirname, '.env')
}).then(function(done) {
    console.log(done);
}).catch(function(err) {
    console.log(err);
});