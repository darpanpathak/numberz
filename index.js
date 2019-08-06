const databaseManager = require('./dbManager');

exports.invoiceHandler = function(event, context, cb) {
    switch (event.httpMethod) {
        case 'GET':
            return getAllInvoices();
        case 'PUT':
            return updateInvoice(event);
        default:
            return notFound();
    }

};

async function getAllInvoices() {
    try {
        const response = await databaseManager.getAll();
        return constructResponse(200, response);
    } catch (error) {
        return constructResponse(500, error);
    }
}

async function updateInvoice(event) {
    try {
        const response = await databaseManager.updateInvoice(event.queryStringParameters.id, event.body);
        return constructResponse(200, response);

    } catch (error) {
        return constructResponse(500, error);
    }
}

function notFound() {
    return constructResponse(404, new Error("Not Found"));
}

function constructResponse(statusCode, message) {
    return {
        statusCode: statusCode,
        body: JSON.stringify(message)
    }
}